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
    return Link.find({ isPrivate: undefined });
  }

  async newLink(url, isPrivate) {
    const alreadyExists = await Link.findOne({ url });

    if (alreadyExists) {
      // eslint-disable-next-line no-underscore-dangle
      return alreadyExists._doc;
    }

    if (!isPrivate) {
      // eslint-disable-next-line no-param-reassign
      isPrivate = undefined;
    }
    const { _doc: data } = await new Link({ url, private: isPrivate }).save();
    return data;
  }

  async findByID(id) {
    return Link.findById(id);
  }

  async getLink(id) {
    return this.findByID(id).url;
  }

  async deleteByID(id) {
    Link.findByIdAndRemove(id);
  }
}

export default new DataBase();
