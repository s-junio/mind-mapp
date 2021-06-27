import UserManager from "./UserManager";

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
        console.log(projectStore);
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
    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  public async saveProject(projectData:any) {
    const store = await this.getStore(DataManager.PROJECTS, 'readonly');
    //TODO save locally

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': UserManagerInstance.getToken()!,
      },
      body: JSON.stringify(projectData),
    };
    
    fetch('/api/projects', requestOptions)
    .then((response) => {});
  }

  public async removeProject(id: string) {
    const store = await this.getStore(DataManager.PROJECTS, 'readwrite');
    const req = store.delete(id);
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
      const list:Project[] = [];
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
