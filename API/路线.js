
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/route/add
  * summary: 新增路线
 * tags: 路线
 */
let apiBusinessRouteAdd_Body = {
      tagId: null,   /** 资讯标签ID(数组)   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      latitude: null,   /** 纬度   string required: */
      routeJson: null,   /** 路线json   string required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      content: null,   /** 内容(富文本)   string required: */
      url: null,   /** 自定义URL   string required: */
      choiceness: null,   /** 是否推荐(0:是1:否)   integer required: */
      urls: null,   /** 图集   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      videoUrl: null,   /** 视频   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      longitude: null,   /** 经度   string required: */
      themeTime: null,   /** 主题时间   string required: */
    }
    
export function apiBusinessRouteAdd_Post(   apiBusinessRouteAdd_Body) {
    return request({
         url:`/api/business/route/add`,
         method:'post',
                      
                 data: apiBusinessRouteAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/route/edit
  * summary: 修改路线
 * tags: 路线
 */
let apiBusinessRouteEdit_Body = {
      tagId: null,   /** 路线标签ID(数组结构)   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      latitude: null,   /** 纬度   string required: */
      routeJson: null,   /** 路线json   string required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      content: null,   /** 内容(富文本)   string required: */
      url: null,   /** 自定义URL   string required: */
      choiceness: null,   /** 是否推荐(0:是1:否)   integer required: */
      urls: null,   /** 图集   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      routeId: null,   /** 路线ID   integer required: */
      videoUrl: null,   /** 视频   string required: */
      versions: null,   /** 版本   integer required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      longitude: null,   /** 经度   string required: */
      themeTime: null,   /** 主题时间   string required: */
    }
    
export function apiBusinessRouteEdit_Post(   apiBusinessRouteEdit_Body) {
    return request({
         url:`/api/business/route/edit`,
         method:'post',
                      
                 data: apiBusinessRouteEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/information/route/${apiBusinessInformationRouterouteIds_Param["routeIds"]}
  * summary: 删除路线
 * tags: 路线
 */
let apiBusinessInformationRouterouteIds_Param = {
     routeIds: null,   /**     string required:true */
   }
    
export function apiBusinessInformationRouterouteIds_Delete( apiBusinessInformationRouterouteIds_Param    ) {
    return request({
         url:`/api/business/information/route/${apiBusinessInformationRouterouteIds_Param["routeIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/route/page
  * summary: 分页查询路线列表
 * tags: 路线
 */
let apiBusinessRoutePage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     tagId: null,   /** 标签ID    string required:false */
     coordinateId: null,   /** 坐标ID    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
     choiceness: null,   /** 是否推荐(0:是1:否)    string required:false */
   }
    
export function apiBusinessRoutePage_Post( apiBusinessRoutePage_Param    ) {
    return request({
         url:`/api/business/route/page`,
         method:'post',
                     params:apiBusinessRoutePage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/route/info/${apiBusinessRouteInforouteId_Param["routeId"]}
  * summary: 获取路线详细信息
 * tags: 路线
 */
let apiBusinessRouteInforouteId_Param = {
     routeId: null,   /**     string required:true */
   }
    
export function apiBusinessRouteInforouteId_Get( apiBusinessRouteInforouteId_Param    ) {
    return request({
         url:`/api/business/route/info/${apiBusinessRouteInforouteId_Param["routeId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/
