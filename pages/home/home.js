// pages/home/home.js
import request from '../../service/network';
import {
  getMultiData,
  getGoodsData
} from '../../service/home';
Page({
  data: {
    banner: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {'page': 0, list: []},
      'new': {'page': 0, list: []},
      'sell': {'page': 0, list: []}
    },
    currentType: 'pop'
  },
  onLoad: function (options) {
    this._getMultiData();
    this._getGoodsData('pop');
  },
  // -------------------------网络请求---------------
  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;

      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1;

    getGoodsData(type, page).then(res => {
      console.log(res.data);
      
      const list = res.data.data.list;
      const oldList = this.data.goods.goods[type].list;
      oldList.push(...list);
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },
  // ---------------------------事件监听------------
  handleTabClick(event) {
    const index = event.detail.index;
    this.setData({
      currentType: this.titles[index]
    })
  }
})