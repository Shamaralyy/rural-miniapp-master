
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/dev/business/carousel/remove/${apiDevBusinessCarouselRemovecarouselIds_Param["carouselIds"]}
  * summary: 删除 轮播图
 * tags: 轮播图 Controller
 */
let apiDevBusinessCarouselRemovecarouselIds_Param = {
     carouselIds: null,   /**     string required:true */
   }
    
export function apiDevBusinessCarouselRemovecarouselIds_Delete( apiDevBusinessCarouselRemovecarouselIds_Param    ) {
    return request({
         url:`/api/dev/business/carousel/remove/${apiDevBusinessCarouselRemovecarouselIds_Param["carouselIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/carousel/edit
  * summary: 修改 轮播图
 * tags: 轮播图 Controller
 */
let apiDevBusinessCarouselEdit_Body = {
      ruralCardId: null,   /** 乡村id   integer required: */
      carouselId: null,   /** $column.columnComment   integer required: */
      images: null,   /** 图片   string required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      introduce: null,   /** 介绍   string required: */
      orderNum: null,   /** 顺序   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      title: null,   /** 标题   string required: */
    }
    
export function apiDevBusinessCarouselEdit_Put(   apiDevBusinessCarouselEdit_Body) {
    return request({
         url:`/api/dev/business/carousel/edit`,
         method:'put',
                      
                 data: apiDevBusinessCarouselEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/carousel/info/${apiDevBusinessCarouselInfocarouselId_Param["carouselId"]}
  * summary: 获取 轮播图 详细信息
 * tags: 轮播图 Controller
 */
let apiDevBusinessCarouselInfocarouselId_Param = {
     carouselId: null,   /**     string required:true */
   }
    
export function apiDevBusinessCarouselInfocarouselId_Get( apiDevBusinessCarouselInfocarouselId_Param    ) {
    return request({
         url:`/api/dev/business/carousel/info/${apiDevBusinessCarouselInfocarouselId_Param["carouselId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/carousel/add
  * summary: 新增 轮播图
 * tags: 轮播图 Controller
 */
let apiDevBusinessCarouselAdd_Body = {
      ruralCardId: null,   /** 乡村id   integer required: */
      carouselId: null,   /** $column.columnComment   integer required: */
      images: null,   /** 图片   string required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      introduce: null,   /** 介绍   string required: */
      orderNum: null,   /** 顺序   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      title: null,   /** 标题   string required: */
    }
    
export function apiDevBusinessCarouselAdd_Post(   apiDevBusinessCarouselAdd_Body) {
    return request({
         url:`/api/dev/business/carousel/add`,
         method:'post',
                      
                 data: apiDevBusinessCarouselAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/carousel/list
  * summary: 分页查询 轮播图 列表
 * tags: 轮播图 Controller
 */
let apiDevBusinessCarouselList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiDevBusinessCarouselList_Body = {
      ruralCardId: null,   /** 乡村id   integer required: */
      carouselId: null,   /** $column.columnComment   integer required: */
      images: null,   /** 图片   string required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      introduce: null,   /** 介绍   string required: */
      orderNum: null,   /** 顺序   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      title: null,   /** 标题   string required: */
    }
        
export function apiDevBusinessCarouselList_Post( apiDevBusinessCarouselList_Param  , apiDevBusinessCarouselList_Body) {
    return request({
         url:`/api/dev/business/carousel/list`,
         method:'post',
                     params:apiDevBusinessCarouselList_Param ,
                 data: apiDevBusinessCarouselList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/carousel/page
  * summary: 增强查询 轮播图 列表(5-30)
 * tags: 轮播图 Controller
 */
let apiDevBusinessCarouselPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     ruralCardId: null,   /**     string required:false */
   }
    
export function apiDevBusinessCarouselPage_Post( apiDevBusinessCarouselPage_Param    ) {
    return request({
         url:`/api/dev/business/carousel/page`,
         method:'post',
                     params:apiDevBusinessCarouselPage_Param  
                
    })
}
/**  =========================================================================== ***/
