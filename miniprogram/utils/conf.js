const userinfo = 'api/user/userinfo'                              // 查询用户信息
const login = 'api/user/login'                                    // 登录

const bindWechat = 'api/user/bindWechat'                          // 绑定微信
const register = 'api/user/register'                              // 注册
const renewal = 'api/user/renewal'                                // 续费
const logout = 'api/user/logout'                                  // 退出
const propertyQuery = 'api/property/query'                        // 房产查询
const propertySort = 'api/property/sort'
const propertyEdit = 'api/property/edit'
const propertySave = 'api/property/save'
const uncollectedQuery = 'api/uncollected/query'                  // 未收账单主页面
const uncollectedReport = 'api/uncollected/report'                    // 未收账单-收据页面
const uncollectedEdit = 'api/uncollected/edit'                        // 未收账单-修改页面
const uncollectedSave = 'api/uncollected/save'                        // 未收账单-修改页面
const uncollectedAccount = 'api/uncollected/account'                  // 未收账单-修改页面
const uncollectedReadingTime = 'api/uncollected/queryReadingTime'
const numberQuery = 'api/number/query'                            // 房间管理页面
const numberEdit = 'api/number/edit'
const numberSave = 'api/number/save'
const numberRental = 'api/number/rental'
const numberCheckin = 'api/number/checkin'
const numberCheckout = 'api/number/checkout'
const collectedQuery = 'api/collected/query'                      // 到账账单页面
const collectedSum = 'api/collected/sum'
const reportQuery = 'api/report/query'                            // 房产报表页面
const reportEchart = 'api/report/echar'

module.exports = {
  userinfo,
  login,

  register,
  renewal,
  logout,
  bindWechat,
  propertyQuery,
  propertySort,
  propertyEdit,
  propertySave,
  uncollectedQuery,
  uncollectedReport,
  uncollectedEdit,
  uncollectedSave,
  uncollectedAccount,
  uncollectedReadingTime,
  numberQuery,
  numberEdit,
  numberSave,
  numberRental,
  numberCheckin,
  numberCheckout,
  collectedQuery,
  collectedSum,
  reportQuery,
  reportEchart,
}