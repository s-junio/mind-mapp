import UserManager from './UserManager';

const UserManagerInstance = UserManager.Instance;

interface Project {
  id: string;
  title: string;
}

class DataManager {
  private static PROJECTS = 'projects';

  private static _instance: DataManager;
  private static request = new Promise<IDBDatabase>((resolve, reject) => {
    const _r = window.indexedDB.open('TextMappDB', 13);
    _r.onsuccess = () => {
      resolve(_r.result);
    };
    _r.onerror = () => {
      reject(_r.error);
    };
    _r.onupgradeneeded = (ev: any) => {
      const db = ev.target.result;
      if (!db.objectStoreNames.contains(DataManager.PROJECTS)) {
        db.createObjectStore(DataManager.PROJECTS, {
          keyPath: '_id',
          autoIncrement: true,
        });
      }
    };
  });

  private generateKey = () => 'n-' + new Date().getTime();

  private constructor() {
    if (!window.indexedDB) {
      alert('This browser does not support local saving.');
    }
  }

  public async setProjectTitle(projectId: string, projectTitle: string) {
    const payload = {
      title: projectTitle,
    };

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': UserManagerInstance.getToken()!,
      },
      body: JSON.stringify(payload),
    };

    return new Promise((resolve, reject) => {
      fetch('/api/projects/' + projectId, requestOptions)
        .then((data) => {
          resolve(data);
          /*  data.json().then((j) => resolve(j)); */
        })
        .catch((err) => {
          reject(err);
          /* err.text().then((t: any) => reject(t)); */
        });
    });
  }

  public async getProject(projectId: string) {
    if (window.navigator.onLine && UserManagerInstance.isAuthenticated()) {
      // Database fetch
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': UserManagerInstance.getToken()!,
        },
      };
      return new Promise((resolve, reject) => {
        fetch('/api/projects/' + projectId, requestOptions)
          .then((data) => {
            data.json().then((j) => resolve(j));
          })
          .catch((err) => {
            err.text().then((t: any) => reject(t));
          });
      });
    } else {
      const store = await this.getStore(DataManager.PROJECTS, 'readonly');
      const req = store.get(projectId);
      return new Promise((resolve, reject) => {
        req.onsuccess = () => {
          resolve(req.result);
        };
        req.onerror = () => {
          reject(req.error);
        };
      });
    }
  }

  public async getProjects() {
    if (window.navigator.onLine && UserManagerInstance.isAuthenticated()) {
      // Database fetch
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': UserManagerInstance.getToken()!,
        },
      };
      return new Promise((resolve, reject) => {
        fetch('/api/projects', requestOptions)
          .then((data) => {
            data.json().then((j) => resolve(j));
          })
          .catch((err) => {
            err.text().then((t: any) => reject(t));
          });
      });
    } else {
      const store = await this.getStore(DataManager.PROJECTS, 'readonly');
      const req = store.getAll();
      return new Promise((resolve, reject) => {
        req.onsuccess = () => {
          resolve(req.result);
        };
        req.onerror = () => {
          reject(req.error);
        };
      });
    }
  }

  public async saveProject(id: string, title: string, projectData: any) {
    //existing project
    if (id) {
      const store = await this.getStore(DataManager.PROJECTS, 'readwrite');
      try {
        const req = store.put({ title, data: projectData }, id);
      } catch (err) {
        console.log(err);
      }

      if (window.navigator.onLine && UserManagerInstance.isAuthenticated()) {
        const payload = {
          data: projectData,
          title: title,
        };

        const requestOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': UserManagerInstance.getToken()!,
          },
          body: JSON.stringify(payload),
        };
        return new Promise((resolve, reject) => {
          fetch('/api/projects/' + id, requestOptions)
            .then((response) => {
              response.json().then((j) => resolve(j));
            })
            .catch((err) => reject(err));
        });
      }
    }
    //new Project
    else {
      const store = await this.getStore(DataManager.PROJECTS, 'readwrite');
      const req = store.add({
        _id: this.generateKey(),
        title,
        data: projectData,
        modified: new Date().toISOString(),
      });
      //TODO save locally

      if (UserManagerInstance.isAuthenticated()) {
        const payload = {
          title: title,
          data: projectData,
        };

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': UserManagerInstance.getToken()!,
          },
          body: JSON.stringify(payload),
        };
        return new Promise((resolve, reject) => {
          fetch('/api/projects', requestOptions)
            .then((response) => {
              response.json().then((j) => resolve(j));
            })
            .catch((err) => reject(err));
        });
      } else {
        return new Promise((resolve, reject) => {
          req.onsuccess = () => {
            resolve({ _id: req.result, title: title });
          };
          req.onerror = () => {
            reject(req.error);
          };
        });
      }
    }
  }

  public async removeProject(id: string) {

   

    if (window.navigator.onLine && UserManagerInstance.isAuthenticated()) {
      // Database DEL
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': UserManagerInstance.getToken()!,
        },
      };
      const res = await fetch('/api/projects/' + id, requestOptions);
      if (res.status === 400) {
        const msg = await res.text();
        return Promise.reject(msg);
      } else {
        return Promise.resolve();
      }
    }

    try {
      const store = await this.getStore(DataManager.PROJECTS, 'readwrite');
      const req = store.delete(id);
      return new Promise((resolve, reject) => {
        req.onsuccess = () => {
          resolve(req.result);
        };
      });
    }
    catch(err){
      console.log(err)
    }

   
  }

  public async filterProjects(term: string) {
    const store = await this.getStore(DataManager.PROJECTS, 'readonly');
    const req = store.openCursor();
    return new Promise((resolve, reject) => {
      const list: Project[] = [];
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          resolve(list);
          return;
        }
        const value = cursor.value;
        const title = value.title.toLowerCase();
        if (title.indexOf(term.toLocaleLowerCase()) !== -1) list.push(value);
        return cursor.continue();
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  private async getStore(
    storeName: string,
    transactionType: IDBTransactionMode
  ) {
    const db = await DataManager.request;
    const tx = db.transaction(storeName, transactionType);
    return tx.objectStore(storeName);
  }

  public static get Instance(): DataManager {
    if (!DataManager._instance) {
      DataManager._instance = new DataManager();
    }
    return DataManager._instance;
  }
}

export default DataManager;
