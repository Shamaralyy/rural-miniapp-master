
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/card/joinRole
  * summary: 获取加入乡村的角色
 * tags: 乡村名片
 */
    
export function apiBusinessCardJoinRole_Post(   ) {
    return request({
         url:`/api/business/card/joinRole`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/join
  * summary: 加入乡村
 * tags: 乡村名片
 */
let apiBusinessCardJoin_Body = {
      roleId: null,   /** 角色ID   integer required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      whitelists: null,   /** 白名单(0-否,1-是)   integer required: */
      job: null,   /** 村内职务   string required: */
    }
    
export function apiBusinessCardJoin_Post(   apiBusinessCardJoin_Body) {
    return request({
         url:`/api/business/card/join`,
         method:'post',
                      
                 data: apiBusinessCardJoin_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/my/rural
  * summary: 获取我加入的乡村
 * tags: 乡村名片
 */
let apiBusinessCardMyRural_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
    
export function apiBusinessCardMyRural_Get( apiBusinessCardMyRural_Param    ) {
    return request({
         url:`/api/business/card/my/rural`,
         method:'get',
                     params:apiBusinessCardMyRural_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/exit
  * summary: 退出乡村名片
 * tags: 乡村名片
 */
let apiBusinessCardExit_Param = {
     cardId: null,   /** 名片id    string required:false */
   }
    
export function apiBusinessCardExit_Post( apiBusinessCardExit_Param    ) {
    return request({
         url:`/api/business/card/exit`,
         method:'post',
                     params:apiBusinessCardExit_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/getAddrId/${apiBusinessCardGetAddrIdcardId_Param["cardId"]}
  * summary: 通过 addrId字段拿到cardId字段
 * tags: 乡村名片
 */
let apiBusinessCardGetAddrIdcardId_Param = {
     addrId: null,   /**     string required:true */
   }
    
export function apiBusinessCardGetAddrIdcardId_Get( apiBusinessCardGetAddrIdcardId_Param    ) {
    return request({
         url:`/api/business/card/getAddrId/${apiBusinessCardGetAddrIdcardId_Param["cardId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/activation
  * summary: 点亮
 * tags: 乡村名片
 */
let apiBusinessCardActivation_Param = {
     cardId: null,   /** 名片ID    string required:false */
     addrId: null,   /** 五级联动ID    string required:false */
   }
    
export function apiBusinessCardActivation_Get( apiBusinessCardActivation_Param    ) {
    return request({
         url:`/api/business/card/activation`,
         method:'get',
                     params:apiBusinessCardActivation_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/count
  * summary: 统计
 * tags: 乡村名片
 */
    
export function apiBusinessCardCount_Get(   ) {
    return request({
         url:`/api/business/card/count`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/getPageviews/${apiBusinessCardGetPageviewscardId_Param["cardId"]}
  * summary: 获取某村的 访问数量 (吴-5-30)
 * tags: 乡村名片
 */
let apiBusinessCardGetPageviewscardId_Param = {
     cardId: null,   /**     string required:true */
   }
    
export function apiBusinessCardGetPageviewscardId_Get( apiBusinessCardGetPageviewscardId_Param    ) {
    return request({
         url:`/api/business/card/getPageviews/${apiBusinessCardGetPageviewscardId_Param["cardId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/anonymous/info
  * summary: 未登录 匿名获取名片详细信息(5-30)
 * tags: 乡村名片
 */
let apiBusinessCardAnonymousInfo_Param = {
     cardId: null,   /** ID    string required:false */
     longitude: null,   /** 经度    string required:false */
     latitude: null,   /** 纬度    string required:false */
   }
    
export function apiBusinessCardAnonymousInfo_Get( apiBusinessCardAnonymousInfo_Param    ) {
    return request({
         url:`/api/business/card/anonymous/info`,
         method:'get',
                     params:apiBusinessCardAnonymousInfo_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/initialize
  * summary: 初始化乡村名片
 * tags: 乡村名片
 */
let apiBusinessCardInitialize_Param = {
     cardId: null,   /**     string required:false */
   }
    
export function apiBusinessCardInitialize_Get( apiBusinessCardInitialize_Param    ) {
    return request({
         url:`/api/business/card/initialize`,
         method:'get',
                     params:apiBusinessCardInitialize_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/remove/${apiBusinessCardRemovecardIds_Param["cardIds"]}
  * summary: 删除乡村名片
 * tags: 乡村名片
 */
let apiBusinessCardRemovecardIds_Param = {
     cardIds: null,   /** 多个id    string required:true */
   }
    
export function apiBusinessCardRemovecardIds_Delete( apiBusinessCardRemovecardIds_Param    ) {
    return request({
         url:`/api/business/card/remove/${apiBusinessCardRemovecardIds_Param["cardIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/edit
  * summary: 修改乡村名片
 * tags: 乡村名片
 */
let apiBusinessCardEdit_Body = {
      sysRole: null,   /** 角色   object required: */
      createUserId: null,   /** 创建者id   integer required: */
      city: null,   /** 城市   string required: */
      latitude: null,   /** 纬度   string required: */
      county: null,   /** 县/区   string required: */
      remark: null,   /** $property.description   string required: */
      ruralAddr: null,   /** 五级地址   object required: */
      cityId: null,   /** 城市   integer required: */
      townId: null,   /** 镇   integer required: */
      type: null,   /** 类型   string required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      mapLevel: null,   /** 地图缩放等级   integer required: */
      pageviews: null,   /** 浏览量   integer required: */
      province: null,   /** 省份   string required: */
      updateByUserId: null,   /** 更新者id   integer required: */
      updateBy: null,   /** $property.description   string required: */
      countyId: null,   /** 县/区   integer required: */
      addrId: null,   /** 五级联动地址ID   integer required: */
      details: null,   /** 详情-富文本   string required: */
      cardTypeId: null,   /** 卡片类型id   integer required: */
      village: null,   /** 村/社区   string required: */
      longitude: null,   /** 经度   string required: */
      images: null,   /** 图集   string required: */
      town: null,   /** 镇   string required: */
      nickName: null,   /** 别名   string required: */
      module: null,   /** 显示模块数组   string required: */
      defaultLevel: null,   /** 默认缩放等级   integer required: */
      mapType: null,   /** 地图默认展示类型= 卫星地图  道路地图   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      synopsis: null,   /** 简介   string required: */
      themeStyleId: null,   /** 主题风格id   integer required: */
      provinceId: null,   /** 省份   integer required: */
      isShow: null,   /** 是否显示(1-显示,0-隐藏)   integer required: */
      navigationJson: null,   /** 乡村的导航数据json   string required: */
      createBy: null,   /** $property.description   string required: */
      propagation: null,   /** 农作动植物   string required: */
      versions: null,   /** 版本值   integer required: */
      createTime: null,   /** $property.description   integer required: */
      cardId: null,   /** 名片ID   integer required: */
      name: null,   /** 村名   string required: */
      villageId: null,   /** 村/社区   integer required: */
      status: null,   /** 状态(0-创建中,1-标准,2-信息未完善,3-审核中)   integer required: */
    }
    
export function apiBusinessCardEdit_Put(   apiBusinessCardEdit_Body) {
    return request({
         url:`/api/business/card/edit`,
         method:'put',
                      
                 data: apiBusinessCardEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/getAddrId/${apiBusinessCardGetAddrIdaddrId_Param["addrId"]}
  * summary: 通过 addrId字段拿到cardId字段
 * tags: 乡村名片
 */
let apiBusinessCardGetAddrIdaddrId_Param = {
     addrId: null,   /**     string required:true */
   }
    
export function apiBusinessCardGetAddrIdaddrId_Get( apiBusinessCardGetAddrIdaddrId_Param    ) {
    return request({
         url:`/api/business/card/getAddrId/${apiBusinessCardGetAddrIdaddrId_Param["addrId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/add
  * summary: 点亮乡村名片
 * tags: 乡村名片
 */
let apiBusinessCardAdd_Body = {
      mapLevel: null,   /** 地图缩放等级   integer required: */
      nickName: null,   /** 别名   string required: */
      roleId: null,   /** 申请身份   integer required: */
      latitude: null,   /** 纬度   string required: */
      defaultLevel: null,   /** 默认缩放等级   integer required: */
      name: null,   /** 村名   string required: */
      mapType: null,   /** 地图默认展示类型= 卫星地图  道路地图   integer required: */
      addrId: null,   /** 五级联动地址ID   integer required: */
      job: null,   /** 村内职务   string required: */
      longitude: null,   /** 经度   string required: */
    }
    
export function apiBusinessCardAdd_Post(   apiBusinessCardAdd_Body) {
    return request({
         url:`/api/business/card/add`,
         method:'post',
                      
                 data: apiBusinessCardAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/quit
  * summary: 取消点亮并且 退出乡村名片
 * tags: 乡村名片
 */
let apiBusinessCardQuit_Param = {
     cardId: null,   /** 名片id    string required:false */
   }
    
export function apiBusinessCardQuit_Post( apiBusinessCardQuit_Param    ) {
    return request({
         url:`/api/business/card/quit`,
         method:'post',
                     params:apiBusinessCardQuit_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/list
  * summary: 分页查询乡村名片列表
 * tags: 乡村名片
 */
let apiBusinessCardList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessCardList_Body = {
      sysRole: null,   /** 角色   object required: */
      createUserId: null,   /** 创建者id   integer required: */
      city: null,   /** 城市   string required: */
      latitude: null,   /** 纬度   string required: */
      county: null,   /** 县/区   string required: */
      remark: null,   /** $property.description   string required: */
      ruralAddr: null,   /** 五级地址   object required: */
      cityId: null,   /** 城市   integer required: */
      townId: null,   /** 镇   integer required: */
      type: null,   /** 类型   string required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      mapLevel: null,   /** 地图缩放等级   integer required: */
      pageviews: null,   /** 浏览量   integer required: */
      province: null,   /** 省份   string required: */
      updateByUserId: null,   /** 更新者id   integer required: */
      updateBy: null,   /** $property.description   string required: */
      countyId: null,   /** 县/区   integer required: */
      addrId: null,   /** 五级联动地址ID   integer required: */
      details: null,   /** 详情-富文本   string required: */
      cardTypeId: null,   /** 卡片类型id   integer required: */
      village: null,   /** 村/社区   string required: */
      longitude: null,   /** 经度   string required: */
      images: null,   /** 图集   string required: */
      town: null,   /** 镇   string required: */
      nickName: null,   /** 别名   string required: */
      module: null,   /** 显示模块数组   string required: */
      defaultLevel: null,   /** 默认缩放等级   integer required: */
      mapType: null,   /** 地图默认展示类型= 卫星地图  道路地图   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      synopsis: null,   /** 简介   string required: */
      themeStyleId: null,   /** 主题风格id   integer required: */
      provinceId: null,   /** 省份   integer required: */
      isShow: null,   /** 是否显示(1-显示,0-隐藏)   integer required: */
      navigationJson: null,   /** 乡村的导航数据json   string required: */
      createBy: null,   /** $property.description   string required: */
      propagation: null,   /** 农作动植物   string required: */
      versions: null,   /** 版本值   integer required: */
      createTime: null,   /** $property.description   integer required: */
      cardId: null,   /** 名片ID   integer required: */
      name: null,   /** 村名   string required: */
      villageId: null,   /** 村/社区   integer required: */
      status: null,   /** 状态(0-创建中,1-标准,2-信息未完善,3-审核中)   integer required: */
    }
        
export function apiBusinessCardList_Post( apiBusinessCardList_Param  , apiBusinessCardList_Body) {
    return request({
         url:`/api/business/card/list`,
         method:'post',
                     params:apiBusinessCardList_Param ,
                 data: apiBusinessCardList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/page
  * summary: 增强 分页名片查询
 * tags: 乡村名片
 */
let apiBusinessCardPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardTypeId: null,   /** 根据类型筛选    string required:false */
     name: null,   /** 根据 名称筛选    string required:false */
     addrId: null,   /** 根据 地址id筛选    string required:false */
     themeStyleId: null,   /** 根据风格筛选    string required:false */
     showLabel: null,   /**     string required:false */
     searchLabel: null,   /**     string required:false */
     longitude: null,   /**     string required:false */
     latitude: null,   /**     string required:false */
     sortType: null,   /**     string required:false */
     status: null,   /**     string required:false */
     init: null,   /** 根据 能初始化的筛选    string required:false */
   }
    
export function apiBusinessCardPage_Post( apiBusinessCardPage_Param    ) {
    return request({
         url:`/api/business/card/page`,
         method:'post',
                     params:apiBusinessCardPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/info
  * summary: 获取乡村名片详细信息(5-30)
 * tags: 乡村名片
 */
let apiBusinessCardInfo_Param = {
     cardId: null,   /** ID    string required:false */
     longitude: null,   /** 经度    string required:false */
     latitude: null,   /** 纬度    string required:false */
   }
    
export function apiBusinessCardInfo_Get( apiBusinessCardInfo_Param    ) {
    return request({
         url:`/api/business/card/info`,
         method:'get',
                     params:apiBusinessCardInfo_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/getJoinNum/${apiBusinessCardGetJoinNumcardId_Param["cardId"]}
  * summary: 查询某村的 加入数量 (吴-5-30)
 * tags: 乡村名片
 */
let apiBusinessCardGetJoinNumcardId_Param = {
     cardId: null,   /**     string required:true */
   }
    
export function apiBusinessCardGetJoinNumcardId_Get( apiBusinessCardGetJoinNumcardId_Param    ) {
    return request({
         url:`/api/business/card/getJoinNum/${apiBusinessCardGetJoinNumcardId_Param["cardId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/card/we
  * summary: 获取加入乡村名片名单 (他也加入了功能)
 * tags: 乡村名片
 */
let apiBusinessCardWe_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /** 通过分页大小实现 获取的数量 默认30    string required:false */
     cardId: null,   /** 名片id    string required:false */
   }
    
export function apiBusinessCardWe_Post( apiBusinessCardWe_Param    ) {
    return request({
         url:`/api/business/card/we`,
         method:'post',
                     params:apiBusinessCardWe_Param  
                
    })
}
/**  =========================================================================== ***/
