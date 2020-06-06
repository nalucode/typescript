import { Db, MongoClient, Collection } from "mongodb";

// models
class UserModel {
  id: string;
  name: string;
}

class MessageModel {
  id: string;
  text: string;
}

// Repos

class RepositoryBase<T> {
  readonly collection: Collection;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  async loadById(id: string): Promise<T> {
    const entity = await this.collection.findOne({ _id: id });
    return entity;
  }
  async loadAll(): Promise<T[]> {
    const list = await this.collection.find().toArray();
    return list;
  }
}

class UserRepository extends RepositoryBase<UserModel> {
  async loadByName(name: string): Promise<UserModel> {
    const user = this.collection.findOne({ name });
    return user;
  }
}

class MessageRepository extends RepositoryBase<MessageModel> {}

class LoginController {
  async login() {
    const client = await MongoClient.connect("mongodb://localhost:27017/db");
    const repo = new UserRepository(client.db(), "users");
    const user = await repo.loadByName("luan");
    user.name;
  }
}
