
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/information/info/${apiBusinessInformationInfoinformationId_Param["informationId"]}
  * summary: 获取乡村名片资讯详细信息
 * tags: 乡村名片资讯
 */
let apiBusinessInformationInfoinformationId_Param = {
     informationId: null,   /**     string required:true */
   }
    
export function apiBusinessInformationInfoinformationId_Get( apiBusinessInformationInfoinformationId_Param    ) {
    return request({
         url:`/api/business/information/info/${apiBusinessInformationInfoinformationId_Param["informationId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/information/page
  * summary: 分页查询乡村名片资讯列表
 * tags: 乡村名片资讯
 */
let apiBusinessInformationPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     tagId: null,   /** 标签ID    string required:false */
     coordinateId: null,   /** 坐标ID    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
     choiceness: null,   /** 是否推荐(0:是1:否)    string required:false */
   }
    
export function apiBusinessInformationPage_Post( apiBusinessInformationPage_Param    ) {
    return request({
         url:`/api/business/information/page`,
         method:'post',
                     params:apiBusinessInformationPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/information/remove/${apiBusinessInformationRemoveinformationIds_Param["informationIds"]}
  * summary: 删除乡村名片资讯
 * tags: 乡村名片资讯
 */
let apiBusinessInformationRemoveinformationIds_Param = {
     informationIds: null,   /**     string required:true */
   }
    
export function apiBusinessInformationRemoveinformationIds_Delete( apiBusinessInformationRemoveinformationIds_Param    ) {
    return request({
         url:`/api/business/information/remove/${apiBusinessInformationRemoveinformationIds_Param["informationIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/information/add
  * summary: 新增乡村名片资讯
 * tags: 乡村名片资讯
 */
let apiBusinessInformationAdd_Body = {
      tagId: null,   /** 资讯标签ID(数组)   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      latitude: null,   /** 纬度   string required: */
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
    
export function apiBusinessInformationAdd_Post(   apiBusinessInformationAdd_Body) {
    return request({
         url:`/api/business/information/add`,
         method:'post',
                      
                 data: apiBusinessInformationAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/information/edit
  * summary: 修改乡村名片资讯
 * tags: 乡村名片资讯
 */
let apiBusinessInformationEdit_Body = {
      tagId: null,   /** 资讯标签ID(数组结构)   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      latitude: null,   /** 纬度   string required: */
      informationId: null,   /** 资讯ID   integer required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      content: null,   /** 内容(富文本)   string required: */
      url: null,   /** 自定义URL   string required: */
      choiceness: null,   /** 是否推荐(0:是1:否)   integer required: */
      urls: null,   /** 图集   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      videoUrl: null,   /** 视频   string required: */
      versions: null,   /** 版本   integer required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      longitude: null,   /** 经度   string required: */
      themeTime: null,   /** 主题时间   string required: */
    }
    
export function apiBusinessInformationEdit_Post(   apiBusinessInformationEdit_Body) {
    return request({
         url:`/api/business/information/edit`,
         method:'post',
                      
                 data: apiBusinessInformationEdit_Body
    })
}
/**  =========================================================================== ***/
