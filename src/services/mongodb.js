/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose';

import {
  DB_USERNAME,
  PASSWORD,
  CLUSTER_NAME,
  SUBDOMAIN,
  DB,
} from '../config.js';

import { Link } from '../models/index.js';

class DataBase {
  constructor() {
    (async () => {
      await mongoose.connect(
        `mongodb+srv://${DB_USERNAME}:${PASSWORD}@${CLUSTER_NAME}.${SUBDOMAIN}.mongodb.net/${DB}?retryWrites=true&w=majority`,
      );
    })();
  }

  async listAllLinks() {
    const links = await Link.find();
    return links;
  }

  async newLink(url, isPublic = false) {
    const link = await new Link({ url, isPublic }).save();
    // eslint-disable-next-line no-underscore-dangle
    return link._doc;
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
