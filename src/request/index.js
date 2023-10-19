// 封装请求数据的具体方法
import request from './axios'
// 请求第一栏组件的数据的方法
export const getReportData = () => request.get('/reportdata')
export const getSaleData = () => request.get('/saledata')
export const getKeyWordData = () => request.get('/keyworddata')
export const getCategoryData = () => request.get('/categorydata')
export const getMapData = () => request.get('/mapdata')
