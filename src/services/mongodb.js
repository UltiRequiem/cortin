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
    const links = await Link.find({ isPrivate: undefined });
    return links;
  }

  async newLink(url, isPrivate) {
    const alreadyExists = await Link.findOne({ url });

    if (alreadyExists) {
      // eslint-disable-next-line no-underscore-dangle
      return alreadyExists._doc;
    }

    if (String(isPrivate) === 'false') {
      // eslint-disable-next-line no-param-reassign
      isPrivate = undefined;
    }
    const { _doc: data } = await new Link({ url, private: isPrivate }).save();
    return data;
  }

  async findByID(id) {
    const link = await Link.findById(id);
    return link;
  }

  async getLink(id) {
    const { url } = await this.findByID(id);
    return url;
  }

  async deleteByID(id) {
    await Link.findByIdAndRemove(id);
  }
}

export default new DataBase();
