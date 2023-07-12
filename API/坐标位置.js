
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/coordinate/page
  * summary: 增强 分页查询坐标列表(6-2)
 * tags: 坐标位置
 */
let apiBusinessCoordinatePage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 乡村ID    string required:false */
     choiceness: null,   /** 是否精选 1精选 0非精选    string required:false */
     tagId: null,   /** 分类ID    string required:false */
   }
    
export function apiBusinessCoordinatePage_Post( apiBusinessCoordinatePage_Param    ) {
    return request({
         url:`/api/business/coordinate/page`,
         method:'post',
                     params:apiBusinessCoordinatePage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinate/info/${apiBusinessCoordinateInfocoordinateId_Param["coordinateId"]}
  * summary: 获取坐标详细信息(6-2)
 * tags: 坐标位置
 */
let apiBusinessCoordinateInfocoordinateId_Param = {
     coordinateId: null,   /**     string required:true */
   }
    
export function apiBusinessCoordinateInfocoordinateId_Get( apiBusinessCoordinateInfocoordinateId_Param    ) {
    return request({
         url:`/api/business/coordinate/info/${apiBusinessCoordinateInfocoordinateId_Param["coordinateId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinate/list
  * summary: 分页查询坐标列表
 * tags: 坐标位置
 */
let apiBusinessCoordinateList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessCoordinateList_Body = {
      images: null,   /** 轮播图   string required: */
      typeKey: null,   /** 所属分类键值   string required: */
      coordinateId: null,   /** $column.columnComment   integer required: */
      latitude: null,   /** 维度   string required: */
      orderNum: null,   /** 根据数值排序   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      userId: null,   /** 创建用户id   integer required: */
      choiceness: null,   /** 是否精选 1精选 0非精选   integer required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 所属名片id   integer required: */
      typeLabel: null,   /** 所属分类标签   string required: */
      longitude: null,   /** 经度   string required: */
      status: null,   /** 状态-0创建成功,1审核通过,2审核不通过   integer required: */
    }
        
export function apiBusinessCoordinateList_Post( apiBusinessCoordinateList_Param  , apiBusinessCoordinateList_Body) {
    return request({
         url:`/api/business/coordinate/list`,
         method:'post',
                     params:apiBusinessCoordinateList_Param ,
                 data: apiBusinessCoordinateList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinate/remove/${apiBusinessCoordinateRemovecoordinateIds_Param["coordinateIds"]}
  * summary: 删除坐标(6-2)
 * tags: 坐标位置
 */
let apiBusinessCoordinateRemovecoordinateIds_Param = {
     coordinateIds: null,   /**     string required:true */
   }
    
export function apiBusinessCoordinateRemovecoordinateIds_Delete( apiBusinessCoordinateRemovecoordinateIds_Param    ) {
    return request({
         url:`/api/business/coordinate/remove/${apiBusinessCoordinateRemovecoordinateIds_Param["coordinateIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinate/add
  * summary: 新增坐标(6-2)
 * tags: 坐标位置
 */
let apiBusinessCoordinateAdd_Body = {
      images: null,   /** 轮播图   string required: */
      tagId: null,   /** 分类ID，数组结构   number required: */
      cardId: null,   /** 所属名片id   integer required: */
      latitude: null,   /** 维度   string required: */
      orderNum: null,   /** 根据数值排序   integer required: */
      longitude: null,   /** 经度   string required: */
      choiceness: null,   /** 是否精选 1精选 0非精选   integer required: */
    }
    
export function apiBusinessCoordinateAdd_Post(   apiBusinessCoordinateAdd_Body) {
    return request({
         url:`/api/business/coordinate/add`,
         method:'post',
                      
                 data: apiBusinessCoordinateAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinate/coordinateLabel
  * summary: 分类下拉数据
 * tags: 坐标位置
 */
let apiBusinessCoordinateCoordinateLabel_Param = {
     cardId: null,   /** 名片ID    string required:false */
   }
    
export function apiBusinessCoordinateCoordinateLabel_Get( apiBusinessCoordinateCoordinateLabel_Param    ) {
    return request({
         url:`/api/business/coordinate/coordinateLabel`,
         method:'get',
                     params:apiBusinessCoordinateCoordinateLabel_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinate/edit
  * summary: 修改坐标(6-2)
 * tags: 坐标位置
 */
let apiBusinessCoordinateEdit_Body = {
      images: null,   /** 轮播图   string required: */
      tagId: null,   /** 分类ID，数组结构   number required: */
      coordinateId: null,   /** ID   integer required: */
      cardId: null,   /** 所属名片id   integer required: */
      latitude: null,   /** 维度   string required: */
      orderNum: null,   /** 根据数值排序   integer required: */
      userId: null,   /** 创建用户id   integer required: */
      longitude: null,   /** 经度   string required: */
      choiceness: null,   /** 是否精选 1精选 0非精选   integer required: */
      status: null,   /** 状态-0创建成功,1审核通过,2审核不通过   integer required: */
    }
    
export function apiBusinessCoordinateEdit_Put(   apiBusinessCoordinateEdit_Body) {
    return request({
         url:`/api/business/coordinate/edit`,
         method:'put',
                      
                 data: apiBusinessCoordinateEdit_Body
    })
}
/**  =========================================================================== ***/
