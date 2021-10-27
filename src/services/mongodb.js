/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose';

import { URI } from '../config.js';

const Link = mongoose.model('link', { url: String });

class DataBase {
  constructor() {
    (async () => {
      await this.connect();
    })();
  }

  async connect() {
    await mongoose.connect(URI);
  }

  async listAllLinks() {
    const links = await Link.find();
    return links;
  }
}

export default new DataBase();
