
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/normal/listCoordinate
  * summary: 分页查询坐标列表
 * tags: 普通用户 查询数据api
 */
let apiNormalListCoordinate_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiNormalListCoordinate_Body = {
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      coordinateId: null,   /** $column.columnComment   integer required: */
      cardId: null,   /** 所属名片id   integer required: */
      latitude: null,   /** 维度   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      userId: null,   /** 创建用户id   integer required: */
      longitude: null,   /** 经度   string required: */
      status: null,   /** 状态-0创建成功,1审核通过,2审核不通过   integer required: */
    }
        
export function apiNormalListCoordinate_Post( apiNormalListCoordinate_Param  , apiNormalListCoordinate_Body) {
    return request({
         url:`/api/normal/listCoordinate`,
         method:'post',
                     params:apiNormalListCoordinate_Param ,
                 data: apiNormalListCoordinate_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/normal/listServe
  * summary: 分页查询服务列表
 * tags: 普通用户 查询数据api
 */
let apiNormalListServe_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiNormalListServe_Body = {
      iconId: null,   /** 设施图标ID   string required: */
      createUserId: null,   /** 创建者的用户ID   integer required: */
      images: null,   /** 图集   string required: */
      tagId: null,   /** 服务标签ID   string required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      serveId: null,   /** 服务ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      content: null,   /** 内容(富文本)   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      createBy: null,   /** $property.description   string required: */
      sendContent: null,   /** 传送内容   string required: */
      videoUrl: null,   /** 视频   string required: */
      versions: null,   /** 版本   integer required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 名片ID   integer required: */
      sendType: null,   /** 传送类型(1:手机,2:微信二维码,3:微信小店,4:微店)   integer required: */
      status: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
    }
        
export function apiNormalListServe_Post( apiNormalListServe_Param  , apiNormalListServe_Body) {
    return request({
         url:`/api/normal/listServe`,
         method:'post',
                     params:apiNormalListServe_Param ,
                 data: apiNormalListServe_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/normal/listRuralCard
  * summary: 分页查询乡村名片列表
 * tags: 普通用户 查询数据api
 */
let apiNormalListRuralCard_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiNormalListRuralCard_Body = {
      createUserId: null,   /** 创建者id   integer required: */
      city: null,   /** 城市   string required: */
      latitude: null,   /** 纬度   string required: */
      county: null,   /** 县/区   string required: */
      remark: null,   /** $property.description   string required: */
      type: null,   /** 类型   string required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      pageviews: null,   /** 浏览量   integer required: */
      province: null,   /** 省份   string required: */
      updateByUserId: null,   /** 更新者id   integer required: */
      updateBy: null,   /** $property.description   string required: */
      addrId: null,   /** 五级联动地址ID   integer required: */
      details: null,   /** 详情-富文本   string required: */
      cardTypeId: null,   /** 卡片类型id   integer required: */
      village: null,   /** 村/社区   string required: */
      longitude: null,   /** 经度   string required: */
      images: null,   /** 图集   string required: */
      town: null,   /** 镇   string required: */
      nickName: null,   /** 别名   string required: */
      module: null,   /** 显示模块数组   string required: */
      updateTime: null,   /** $property.description   integer required: */
      synopsis: null,   /** 简介   string required: */
      themeStyleId: null,   /** 主题风格id   integer required: */
      isShow: null,   /** 是否显示(1-显示,0-隐藏)   integer required: */
      createBy: null,   /** $property.description   string required: */
      propagation: null,   /** 农作动植物   string required: */
      versions: null,   /** 版本值   integer required: */
      createTime: null,   /** $property.description   integer required: */
      cardId: null,   /** 名片ID   integer required: */
      name: null,   /** 村名   string required: */
      status: null,   /** 状态(0-创建中,1-标准,2-信息未完善,3-审核中)   integer required: */
    }
        
export function apiNormalListRuralCard_Post( apiNormalListRuralCard_Param  , apiNormalListRuralCard_Body) {
    return request({
         url:`/api/normal/listRuralCard`,
         method:'post',
                     params:apiNormalListRuralCard_Param ,
                 data: apiNormalListRuralCard_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/normal/listServeTag
  * summary: 分页查询服务标签列表
 * tags: 普通用户 查询数据api
 */
let apiNormalListServeTag_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiNormalListServeTag_Body = {
      iconId: null,   /** 图标ID   integer required: */
      tagId: null,   /** 标签ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      sort: null,   /** 排序   integer required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:暂停)   integer required: */
      createBy: null,   /** $property.description   string required: */
      tabTemplate: null,   /** 标签模板   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      failMsg: null,   /** 失败原因   string required: */
      exhibit: null,   /** 展示数量   integer required: */
      status: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
    }
        
export function apiNormalListServeTag_Post( apiNormalListServeTag_Param  , apiNormalListServeTag_Body) {
    return request({
         url:`/api/normal/listServeTag`,
         method:'post',
                     params:apiNormalListServeTag_Param ,
                 data: apiNormalListServeTag_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/normal/listCardType
  * summary: 分页查询名片类型列表
 * tags: 普通用户 查询数据api
 */
let apiNormalListCardType_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiNormalListCardType_Body = {
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      introduce: null,   /** 介绍   string required: */
      name: null,   /** 名称   string required: */
      icon: null,   /** 图标   string required: */
      typeId: null,   /** 类型ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
    }
        
export function apiNormalListCardType_Post( apiNormalListCardType_Param  , apiNormalListCardType_Body) {
    return request({
         url:`/api/normal/listCardType`,
         method:'post',
                     params:apiNormalListCardType_Param ,
                 data: apiNormalListCardType_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/normal/pageRuralCard
  * summary: 增强 分页名片查询
 * tags: 普通用户 查询数据api
 */
let apiNormalPageRuralCard_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardTypeId: null,   /** 根据类型筛选    string required:false */
     name: null,   /** 根据 名称筛选    string required:false */
     themeStyleId: null,   /** 根据风格筛选    string required:false */
   }
    
export function apiNormalPageRuralCard_Post( apiNormalPageRuralCard_Param    ) {
    return request({
         url:`/api/normal/pageRuralCard`,
         method:'post',
                     params:apiNormalPageRuralCard_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/normal/listCommodity
  * summary: 分页查询商品-好物列表
 * tags: 普通用户 查询数据api
 */
let apiNormalListCommodity_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiNormalListCommodity_Body = {
      unitPrice: null,   /** 单价   number required: */
      images: null,   /** 发布图片json   string required: */
      quantity: null,   /** 数量   integer required: */
      coordinateId: null,   /** 坐标id   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      commodityId: null,   /** $column.columnComment   integer required: */
      userId: null,   /** 发布用户id   integer required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 名片id   integer required: */
      name: null,   /** 商品名   string required: */
      status: null,   /** 状态=0未审核,1审核通过,2拒绝   integer required: */
    }
        
export function apiNormalListCommodity_Post( apiNormalListCommodity_Param  , apiNormalListCommodity_Body) {
    return request({
         url:`/api/normal/listCommodity`,
         method:'post',
                     params:apiNormalListCommodity_Param ,
                 data: apiNormalListCommodity_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/normal/listCardInformation
  * summary: 分页查询乡村名片资讯列表
 * tags: 普通用户 查询数据api
 */
let apiNormalListCardInformation_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiNormalListCardInformation_Body = {
      tagId: null,   /** 资讯标签ID   integer required: */
      latitude: null,   /** 纬度   string required: */
      remark: null,   /** $property.description   string required: */
      title: null,   /** 标题   string required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      content: null,   /** 内容(富文本)   string required: */
      urls: null,   /** 图集   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      videoUrl: null,   /** 视频   string required: */
      updateByUserId: null,   /** 更新者   integer required: */
      updateBy: null,   /** $property.description   string required: */
      longitude: null,   /** 经度   string required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      informationId: null,   /** 资讯ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      synopsis: null,   /** 简介   string required: */
      userId: null,   /** 创建的用户ID   integer required: */
      url: null,   /** 自定义URL   string required: */
      createBy: null,   /** $property.description   string required: */
      versions: null,   /** 版本   integer required: */
      createTime: null,   /** $property.description   integer required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      failMsg: null,   /** 失败原因   string required: */
      themeTime: null,   /** 主题时间   string required: */
      status: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
    }
        
export function apiNormalListCardInformation_Post( apiNormalListCardInformation_Param  , apiNormalListCardInformation_Body) {
    return request({
         url:`/api/normal/listCardInformation`,
         method:'post',
                     params:apiNormalListCardInformation_Param ,
                 data: apiNormalListCardInformation_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/normal/listCardInformationTag
  * summary: 分页查询资讯标签列表
 * tags: 普通用户 查询数据api
 */
let apiNormalListCardInformationTag_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiNormalListCardInformationTag_Body = {
      iconId: null,   /** 图标ID   integer required: */
      infoTagId: null,   /** 标签ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      createByUserId: null,   /** 创建者   integer required: */
      sort: null,   /** 排序   integer required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   integer required: */
      createBy: null,   /** $property.description   string required: */
      tabTemplate: null,   /** 标签模板   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      failMsg: null,   /** 失败原因   string required: */
      exhibit: null,   /** 展示数量   integer required: */
      status: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
    }
        
export function apiNormalListCardInformationTag_Post( apiNormalListCardInformationTag_Param  , apiNormalListCardInformationTag_Body) {
    return request({
         url:`/api/normal/listCardInformationTag`,
         method:'post',
                     params:apiNormalListCardInformationTag_Param ,
                 data: apiNormalListCardInformationTag_Body
    })
}
/**  =========================================================================== ***/
