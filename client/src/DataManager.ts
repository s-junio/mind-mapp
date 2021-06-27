import UserManager from './UserManager';

const UserManagerInstance = UserManager.Instance;
const projectData = [
  {
    title: 'Project Plansssssssssssssssssssssssss',
    id: 'ee-dd231',
  },
  {
    title: 'A new idea',
    id: 'ee-dd232',
  },
  {
    title: 'TDD',
    id: 'ee-dd233',
  },
  {
    title: 'Reviews',
    id: 'ee-dd234',
  },
  {
    title: 'Planing',
    id: 'ee-dd235',
  },
  {
    title: 'Planing2',
    id: 'ee-dd236',
  },
  {
    title: 'Planing3',
    id: 'ee-dd237',
  },
];

interface Project {
  id: string;
  title: string;
}

class DataManager {
  private static PROJECTS = 'projects';

  private static _instance: DataManager;
  private static request = new Promise<IDBDatabase>((resolve, reject) => {
    const _r = window.indexedDB.open('MyTestDatabase', 13);
    _r.onsuccess = () => {
      resolve(_r.result);
    };
    _r.onerror = () => {
      reject(_r.error);
    };
    _r.onupgradeneeded = (ev: any) => {
      const db = ev.target.result;
      if (!db.objectStoreNames.contains(DataManager.PROJECTS)) {
        const projectStore = db.createObjectStore(DataManager.PROJECTS, {
          keyPath: 'id',
          autoIncrement: true,
        });

        projectData.forEach(function (project: any) {
          projectStore.add(project);
        });
      }
    };
  });

  private constructor() {
    if (!window.indexedDB) {
      alert('This browser does not support local saving.');
    }
  }

  public async getProjects() {
    const store = await this.getStore(DataManager.PROJECTS, 'readonly');
    const req = store.getAll();

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

    /* return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    }); */
  }

  public async saveProject(id: string, title: string, projectData: any) {
    //existing project
    if (id) {
      alert('saving existing project');
    }
    //new Project
    else {
      const store = await this.getStore(DataManager.PROJECTS, 'readonly');
      //TODO save locally

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
    }
  }

  public async removeProject(id: string) {
    const store = await this.getStore(DataManager.PROJECTS, 'readwrite');
    const req = store.delete(id);

    if (window.navigator.onLine) {
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
      }
      else {
        return Promise.resolve();
      }
    }

    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
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
