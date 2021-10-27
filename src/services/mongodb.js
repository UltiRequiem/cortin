/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose';

import { URI } from '../config.js';

const {
  mongo: { ObjectId },
} = mongoose;

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

  async findByID(id) {
    const link = await Link.findById(id);
    return link.url;
  }

  async deleteByID(id) {
    await Link.findByIdAndRemove(id);
  }
}

export default new DataBase();
