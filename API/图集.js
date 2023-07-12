
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/atlas/page
  * summary: 分页查询图集列表
 * tags: 图集
 */
let apiBusinessAtlasPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     tagId: null,   /** 标签ID    string required:false */
     coordinateId: null,   /** 坐标ID    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
     choiceness: null,   /** 是否推荐(0:是1:否)    string required:false */
     type: null,   /** 类型(1:图片，2:视频，3:全景)    string required:false */
   }
    
export function apiBusinessAtlasPage_Post( apiBusinessAtlasPage_Param    ) {
    return request({
         url:`/api/business/atlas/page`,
         method:'post',
                     params:apiBusinessAtlasPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlas/info/${apiBusinessAtlasInfoatlasId_Param["atlasId"]}
  * summary: 获取图集详细信息
 * tags: 图集
 */
let apiBusinessAtlasInfoatlasId_Param = {
     atlasId: null,   /**     string required:true */
   }
    
export function apiBusinessAtlasInfoatlasId_Get( apiBusinessAtlasInfoatlasId_Param    ) {
    return request({
         url:`/api/business/atlas/info/${apiBusinessAtlasInfoatlasId_Param["atlasId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlas/edit
  * summary: 修改图集
 * tags: 图集
 */
let apiBusinessAtlasEdit_Body = {
      tagId: null,   /** 图集标签ID(数组结构)   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      latitude: null,   /** 纬度   string required: */
      atlasId: null,   /** 图集ID   integer required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      type: null,   /** 类型(1:图片，2:视频，3:全景)   integer required: */
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
    
export function apiBusinessAtlasEdit_Post(   apiBusinessAtlasEdit_Body) {
    return request({
         url:`/api/business/atlas/edit`,
         method:'post',
                      
                 data: apiBusinessAtlasEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlas/add
  * summary: 新增图集
 * tags: 图集
 */
let apiBusinessAtlasAdd_Body = {
      tagId: null,   /** 图集标签ID(数组)   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      latitude: null,   /** 纬度   string required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      type: null,   /** 类型(1:图片，2:视频，3:全景)   integer required: */
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
    
export function apiBusinessAtlasAdd_Post(   apiBusinessAtlasAdd_Body) {
    return request({
         url:`/api/business/atlas/add`,
         method:'post',
                      
                 data: apiBusinessAtlasAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlas/remove/${apiBusinessAtlasRemoveatlasIds_Param["atlasIds"]}
  * summary: 删除图集
 * tags: 图集
 */
let apiBusinessAtlasRemoveatlasIds_Param = {
     atlasIds: null,   /**     string required:true */
   }
    
export function apiBusinessAtlasRemoveatlasIds_Delete( apiBusinessAtlasRemoveatlasIds_Param    ) {
    return request({
         url:`/api/business/atlas/remove/${apiBusinessAtlasRemoveatlasIds_Param["atlasIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/
