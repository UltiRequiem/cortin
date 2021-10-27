/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose';

import { URI } from '../config.js';

const Link = mongoose.model('link', { url: String });

class DataBase {
  constructor() {
    (async () => {
      await mongoose.connect(URI);
    })();
  }

  async listAllLinks() {
    const links = await Link.find();
    return links;
  }

  async newLink(link) {
    await new Link({ url: link }).save();
  }
}

export default new DataBase();
