
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/admin/query/listCardInformation
  * summary: 分页查询乡村名片资讯列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryListCardInformation_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryListCardInformation_Body = {
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
        
export function apiAdminQueryListCardInformation_Post( apiAdminQueryListCardInformation_Param  , apiAdminQueryListCardInformation_Body) {
    return request({
         url:`/api/admin/query/listCardInformation`,
         method:'post',
                     params:apiAdminQueryListCardInformation_Param ,
                 data: apiAdminQueryListCardInformation_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/list
  * summary: 分页查询名片修改记录列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryList_Body = {
      sureContent: null,   /** 确定内容   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      type: null,   /** 类型(1:名片,2:服务,3:资讯)   integer required: */
      userId: null,   /** 用户ID   integer required: */
      isShow: null,   /** 是否显示 1显示 0隐藏   integer required: */
      recordId: null,   /** 记录ID   integer required: */
      reviewerUserId: null,   /** 审核人用户ID   integer required: */
      createBy: null,   /** $property.description   string required: */
      field: null,   /** 字段   string required: */
      versions: null,   /** 版本值   integer required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 所属名片ID   integer required: */
      reviewerTime: null,   /** 审核时间   integer required: */
      failMsg: null,   /** 失败原因   string required: */
      typeId: null,   /** 类型ID   integer required: */
      updateContent: null,   /** 修改内容   string required: */
      originalContent: null,   /** 原始内容   string required: */
      status: null,   /** 状态-0-未生效,1-生效,2-回退   integer required: */
    }
        
export function apiAdminQueryList_Post( apiAdminQueryList_Param  , apiAdminQueryList_Body) {
    return request({
         url:`/api/admin/query/list`,
         method:'post',
                     params:apiAdminQueryList_Param ,
                 data: apiAdminQueryList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/pageRuralCard
  * summary: 增强 分页 名片查询
 * tags: 管理员 获取数据
 */
let apiAdminQueryPageRuralCard_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardTypeId: null,   /** 根据类型筛选    string required:false */
     name: null,   /** 根据 名称筛选    string required:false */
     themeStyleId: null,   /** 根据风格筛选    string required:false */
   }
    
export function apiAdminQueryPageRuralCard_Post( apiAdminQueryPageRuralCard_Param    ) {
    return request({
         url:`/api/admin/query/pageRuralCard`,
         method:'post',
                     params:apiAdminQueryPageRuralCard_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/listServeTag
  * summary: 分页查询服务标签列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryListServeTag_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryListServeTag_Body = {
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
        
export function apiAdminQueryListServeTag_Post( apiAdminQueryListServeTag_Param  , apiAdminQueryListServeTag_Body) {
    return request({
         url:`/api/admin/query/listServeTag`,
         method:'post',
                     params:apiAdminQueryListServeTag_Param ,
                 data: apiAdminQueryListServeTag_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/listCardType
  * summary: 分页查询名片类型列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryListCardType_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryListCardType_Body = {
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
        
export function apiAdminQueryListCardType_Post( apiAdminQueryListCardType_Param  , apiAdminQueryListCardType_Body) {
    return request({
         url:`/api/admin/query/listCardType`,
         method:'post',
                     params:apiAdminQueryListCardType_Param ,
                 data: apiAdminQueryListCardType_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/listCommodity
  * summary: 分页查询商品-好物列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryListCommodity_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryListCommodity_Body = {
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
        
export function apiAdminQueryListCommodity_Post( apiAdminQueryListCommodity_Param  , apiAdminQueryListCommodity_Body) {
    return request({
         url:`/api/admin/query/listCommodity`,
         method:'post',
                     params:apiAdminQueryListCommodity_Param ,
                 data: apiAdminQueryListCommodity_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/affPage
  * summary: 查询 乡村加入列表 分页
 * tags: 管理员 获取数据
 */
let apiAdminQueryAffPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     status: null,   /** 根据状态筛选    string required:false */
   }
    
export function apiAdminQueryAffPage_Post( apiAdminQueryAffPage_Param    ) {
    return request({
         url:`/api/admin/query/affPage`,
         method:'post',
                     params:apiAdminQueryAffPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/page
  * summary: 增强 修改记录列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     status: null,   /** 根据状态筛选 状态-0-未生效,1-生效,2-回退    string required:false */
   }
    
export function apiAdminQueryPage_Post( apiAdminQueryPage_Param    ) {
    return request({
         url:`/api/admin/query/page`,
         method:'post',
                     params:apiAdminQueryPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/listCoordinate
  * summary: 分页查询坐标列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryListCoordinate_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryListCoordinate_Body = {
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
        
export function apiAdminQueryListCoordinate_Post( apiAdminQueryListCoordinate_Param  , apiAdminQueryListCoordinate_Body) {
    return request({
         url:`/api/admin/query/listCoordinate`,
         method:'post',
                     params:apiAdminQueryListCoordinate_Param ,
                 data: apiAdminQueryListCoordinate_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/listServe
  * summary: 分页查询服务列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryListServe_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryListServe_Body = {
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
        
export function apiAdminQueryListServe_Post( apiAdminQueryListServe_Param  , apiAdminQueryListServe_Body) {
    return request({
         url:`/api/admin/query/listServe`,
         method:'post',
                     params:apiAdminQueryListServe_Param ,
                 data: apiAdminQueryListServe_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/listRuralCard
  * summary: 分页查询乡村名片列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryListRuralCard_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryListRuralCard_Body = {
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
        
export function apiAdminQueryListRuralCard_Post( apiAdminQueryListRuralCard_Param  , apiAdminQueryListRuralCard_Body) {
    return request({
         url:`/api/admin/query/listRuralCard`,
         method:'post',
                     params:apiAdminQueryListRuralCard_Param ,
                 data: apiAdminQueryListRuralCard_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/query/listCardInformationTag
  * summary: 分页查询资讯标签列表
 * tags: 管理员 获取数据
 */
let apiAdminQueryListCardInformationTag_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiAdminQueryListCardInformationTag_Body = {
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
        
export function apiAdminQueryListCardInformationTag_Post( apiAdminQueryListCardInformationTag_Param  , apiAdminQueryListCardInformationTag_Body) {
    return request({
         url:`/api/admin/query/listCardInformationTag`,
         method:'post',
                     params:apiAdminQueryListCardInformationTag_Param ,
                 data: apiAdminQueryListCardInformationTag_Body
    })
}
/**  =========================================================================== ***/
