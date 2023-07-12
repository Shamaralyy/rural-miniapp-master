
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /business/ruralAddr/list
  * summary: 分页查询五级联动地址数据列表
 * tags: 新 级联动地址数据(后台管理)
 */
let businessRuralAddrList_Param = {
     id: null,   /** $column.columnComment    string required:false */
     level: null,   /** 等级    string required:false */
     name: null,   /** 名称    string required:false */
     oldName: null,   /** 原名称    string required:false */
     parentCode: null,   /** 父级代码    string required:false */
     cityCode: null,   /** 城市代码    string required:false */
     officialCode: null,   /** 官方代码    string required:false */
     type: null,   /** 类型    string required:false */
     property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村    string required:false */
     parentAddr.id: null,   /** $column.columnComment    string required:false */
     parentAddr.level: null,   /** 等级    string required:false */
     parentAddr.name: null,   /** 名称    string required:false */
     parentAddr.oldName: null,   /** 原名称    string required:false */
     parentAddr.parentCode: null,   /** 父级代码    string required:false */
     parentAddr.cityCode: null,   /** 城市代码    string required:false */
     parentAddr.officialCode: null,   /** 官方代码    string required:false */
     parentAddr.type: null,   /** 类型    string required:false */
     parentAddr.property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村    string required:false */
     parentAddr.sysRole.roleId: null,   /** 角色ID    string required:false */
     parentAddr.sysRole.roleName: null,   /** 角色名称    string required:false */
     parentAddr.sysRole.roleKey: null,   /** 角色权限    string required:false */
     parentAddr.sysRole.roleSort: null,   /** 角色排序    string required:false */
     parentAddr.sysRole.dataScope: null,   /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限）    string required:false */
     parentAddr.sysRole.menuCheckStrictly: null,   /** 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）    string required:false */
     parentAddr.sysRole.deptCheckStrictly: null,   /** 部门树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ）    string required:false */
     parentAddr.sysRole.status: null,   /** 角色状态（0正常 1停用）    string required:false */
     parentAddr.sysRole.delFlag: null,   /** 删除标志（0代表存在 2代表删除）    string required:false */
     parentAddr.sysRole.flag: null,   /** 用户是否存在此角色标识 默认不存在    string required:false */
     parentAddr.sysRole.menuIds[0]: null,   /** 菜单组    string required:false */
     parentAddr.sysRole.deptIds[0]: null,   /** 部门组（数据权限）    string required:false */
     parentAddr.sysRole.searchValue: null,   /** 搜索值    string required:false */
     parentAddr.sysRole.createBy: null,   /** 创建者    string required:false */
     parentAddr.sysRole.createTime: null,   /** 创建时间    string required:false */
     parentAddr.sysRole.updateBy: null,   /** 更新者    string required:false */
     parentAddr.sysRole.updateTime: null,   /** 更新时间    string required:false */
     parentAddr.sysRole.remark: null,   /** 备注    string required:false */
     parentAddr.parentCodeStr: null,   /** 父级代码字符串    string required:false */
     parentAddr.createBy: null,   /**     string required:false */
     parentAddr.createTime: null,   /**     string required:false */
     parentAddr.updateBy: null,   /**     string required:false */
     parentAddr.updateTime: null,   /**     string required:false */
     parentAddr.remark: null,   /**     string required:false */
     lowerAddr[0].id: null,   /** $column.columnComment    string required:false */
     lowerAddr[0].level: null,   /** 等级    string required:false */
     lowerAddr[0].name: null,   /** 名称    string required:false */
     lowerAddr[0].oldName: null,   /** 原名称    string required:false */
     lowerAddr[0].parentCode: null,   /** 父级代码    string required:false */
     lowerAddr[0].cityCode: null,   /** 城市代码    string required:false */
     lowerAddr[0].officialCode: null,   /** 官方代码    string required:false */
     lowerAddr[0].type: null,   /** 类型    string required:false */
     lowerAddr[0].property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村    string required:false */
     lowerAddr[0].sysRole.roleId: null,   /** 角色ID    string required:false */
     lowerAddr[0].sysRole.roleName: null,   /** 角色名称    string required:false */
     lowerAddr[0].sysRole.roleKey: null,   /** 角色权限    string required:false */
     lowerAddr[0].sysRole.roleSort: null,   /** 角色排序    string required:false */
     lowerAddr[0].sysRole.dataScope: null,   /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限）    string required:false */
     lowerAddr[0].sysRole.menuCheckStrictly: null,   /** 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）    string required:false */
     lowerAddr[0].sysRole.deptCheckStrictly: null,   /** 部门树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ）    string required:false */
     lowerAddr[0].sysRole.status: null,   /** 角色状态（0正常 1停用）    string required:false */
     lowerAddr[0].sysRole.delFlag: null,   /** 删除标志（0代表存在 2代表删除）    string required:false */
     lowerAddr[0].sysRole.flag: null,   /** 用户是否存在此角色标识 默认不存在    string required:false */
     lowerAddr[0].sysRole.menuIds[0]: null,   /** 菜单组    string required:false */
     lowerAddr[0].sysRole.deptIds[0]: null,   /** 部门组（数据权限）    string required:false */
     lowerAddr[0].sysRole.searchValue: null,   /** 搜索值    string required:false */
     lowerAddr[0].sysRole.createBy: null,   /** 创建者    string required:false */
     lowerAddr[0].sysRole.createTime: null,   /** 创建时间    string required:false */
     lowerAddr[0].sysRole.updateBy: null,   /** 更新者    string required:false */
     lowerAddr[0].sysRole.updateTime: null,   /** 更新时间    string required:false */
     lowerAddr[0].sysRole.remark: null,   /** 备注    string required:false */
     lowerAddr[0].parentCodeStr: null,   /** 父级代码字符串    string required:false */
     lowerAddr[0].createBy: null,   /**     string required:false */
     lowerAddr[0].createTime: null,   /**     string required:false */
     lowerAddr[0].updateBy: null,   /**     string required:false */
     lowerAddr[0].updateTime: null,   /**     string required:false */
     lowerAddr[0].remark: null,   /**     string required:false */
     sysRole.roleId: null,   /** 角色ID    string required:false */
     sysRole.roleName: null,   /** 角色名称    string required:false */
     sysRole.roleKey: null,   /** 角色权限    string required:false */
     sysRole.roleSort: null,   /** 角色排序    string required:false */
     sysRole.dataScope: null,   /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限）    string required:false */
     sysRole.menuCheckStrictly: null,   /** 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）    string required:false */
     sysRole.deptCheckStrictly: null,   /** 部门树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ）    string required:false */
     sysRole.status: null,   /** 角色状态（0正常 1停用）    string required:false */
     sysRole.delFlag: null,   /** 删除标志（0代表存在 2代表删除）    string required:false */
     sysRole.flag: null,   /** 用户是否存在此角色标识 默认不存在    string required:false */
     sysRole.menuIds[0]: null,   /** 菜单组    string required:false */
     sysRole.deptIds[0]: null,   /** 部门组（数据权限）    string required:false */
     sysRole.searchValue: null,   /** 搜索值    string required:false */
     sysRole.createBy: null,   /** 创建者    string required:false */
     sysRole.createTime: null,   /** 创建时间    string required:false */
     sysRole.updateBy: null,   /** 更新者    string required:false */
     sysRole.updateTime: null,   /** 更新时间    string required:false */
     sysRole.remark: null,   /** 备注    string required:false */
     parentCodeStr: null,   /** 父级代码字符串    string required:false */
     createBy: null,   /**     string required:false */
     createTime: null,   /**     string required:false */
     updateBy: null,   /**     string required:false */
     updateTime: null,   /**     string required:false */
     remark: null,   /**     string required:false */
   }
    
export function businessRuralAddrList_Get( businessRuralAddrList_Param    ) {
    return request({
         url:`/business/ruralAddr/list`,
         method:'get',
                     params:businessRuralAddrList_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /business/ruralAddr/${businessRuralAddrid_Param["id"]}
  * summary: 获取五级联动地址数据详细信息
 * tags: 新 级联动地址数据(后台管理)
 */
let businessRuralAddrid_Param = {
     id: null,   /**     string required:true */
   }
    
export function businessRuralAddrid_Get( businessRuralAddrid_Param    ) {
    return request({
         url:`/business/ruralAddr/${businessRuralAddrid_Param["id"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /business/ruralAddr/cascader
  * summary: 分级别查询
 * tags: 新 级联动地址数据(后台管理)
 */
let businessRuralAddrCascader_Param = {
     id: null,   /** $column.columnComment    string required:false */
     level: null,   /** 等级    string required:false */
     name: null,   /** 名称    string required:false */
     oldName: null,   /** 原名称    string required:false */
     parentCode: null,   /** 父级代码    string required:false */
     cityCode: null,   /** 城市代码    string required:false */
     officialCode: null,   /** 官方代码    string required:false */
     type: null,   /** 类型    string required:false */
     property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村    string required:false */
     parentAddr.id: null,   /** $column.columnComment    string required:false */
     parentAddr.level: null,   /** 等级    string required:false */
     parentAddr.name: null,   /** 名称    string required:false */
     parentAddr.oldName: null,   /** 原名称    string required:false */
     parentAddr.parentCode: null,   /** 父级代码    string required:false */
     parentAddr.cityCode: null,   /** 城市代码    string required:false */
     parentAddr.officialCode: null,   /** 官方代码    string required:false */
     parentAddr.type: null,   /** 类型    string required:false */
     parentAddr.property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村    string required:false */
     parentAddr.sysRole.roleId: null,   /** 角色ID    string required:false */
     parentAddr.sysRole.roleName: null,   /** 角色名称    string required:false */
     parentAddr.sysRole.roleKey: null,   /** 角色权限    string required:false */
     parentAddr.sysRole.roleSort: null,   /** 角色排序    string required:false */
     parentAddr.sysRole.dataScope: null,   /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限）    string required:false */
     parentAddr.sysRole.menuCheckStrictly: null,   /** 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）    string required:false */
     parentAddr.sysRole.deptCheckStrictly: null,   /** 部门树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ）    string required:false */
     parentAddr.sysRole.status: null,   /** 角色状态（0正常 1停用）    string required:false */
     parentAddr.sysRole.delFlag: null,   /** 删除标志（0代表存在 2代表删除）    string required:false */
     parentAddr.sysRole.flag: null,   /** 用户是否存在此角色标识 默认不存在    string required:false */
     parentAddr.sysRole.menuIds[0]: null,   /** 菜单组    string required:false */
     parentAddr.sysRole.deptIds[0]: null,   /** 部门组（数据权限）    string required:false */
     parentAddr.sysRole.searchValue: null,   /** 搜索值    string required:false */
     parentAddr.sysRole.createBy: null,   /** 创建者    string required:false */
     parentAddr.sysRole.createTime: null,   /** 创建时间    string required:false */
     parentAddr.sysRole.updateBy: null,   /** 更新者    string required:false */
     parentAddr.sysRole.updateTime: null,   /** 更新时间    string required:false */
     parentAddr.sysRole.remark: null,   /** 备注    string required:false */
     parentAddr.parentCodeStr: null,   /** 父级代码字符串    string required:false */
     parentAddr.createBy: null,   /**     string required:false */
     parentAddr.createTime: null,   /**     string required:false */
     parentAddr.updateBy: null,   /**     string required:false */
     parentAddr.updateTime: null,   /**     string required:false */
     parentAddr.remark: null,   /**     string required:false */
     lowerAddr[0].id: null,   /** $column.columnComment    string required:false */
     lowerAddr[0].level: null,   /** 等级    string required:false */
     lowerAddr[0].name: null,   /** 名称    string required:false */
     lowerAddr[0].oldName: null,   /** 原名称    string required:false */
     lowerAddr[0].parentCode: null,   /** 父级代码    string required:false */
     lowerAddr[0].cityCode: null,   /** 城市代码    string required:false */
     lowerAddr[0].officialCode: null,   /** 官方代码    string required:false */
     lowerAddr[0].type: null,   /** 类型    string required:false */
     lowerAddr[0].property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村    string required:false */
     lowerAddr[0].sysRole.roleId: null,   /** 角色ID    string required:false */
     lowerAddr[0].sysRole.roleName: null,   /** 角色名称    string required:false */
     lowerAddr[0].sysRole.roleKey: null,   /** 角色权限    string required:false */
     lowerAddr[0].sysRole.roleSort: null,   /** 角色排序    string required:false */
     lowerAddr[0].sysRole.dataScope: null,   /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限）    string required:false */
     lowerAddr[0].sysRole.menuCheckStrictly: null,   /** 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）    string required:false */
     lowerAddr[0].sysRole.deptCheckStrictly: null,   /** 部门树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ）    string required:false */
     lowerAddr[0].sysRole.status: null,   /** 角色状态（0正常 1停用）    string required:false */
     lowerAddr[0].sysRole.delFlag: null,   /** 删除标志（0代表存在 2代表删除）    string required:false */
     lowerAddr[0].sysRole.flag: null,   /** 用户是否存在此角色标识 默认不存在    string required:false */
     lowerAddr[0].sysRole.menuIds[0]: null,   /** 菜单组    string required:false */
     lowerAddr[0].sysRole.deptIds[0]: null,   /** 部门组（数据权限）    string required:false */
     lowerAddr[0].sysRole.searchValue: null,   /** 搜索值    string required:false */
     lowerAddr[0].sysRole.createBy: null,   /** 创建者    string required:false */
     lowerAddr[0].sysRole.createTime: null,   /** 创建时间    string required:false */
     lowerAddr[0].sysRole.updateBy: null,   /** 更新者    string required:false */
     lowerAddr[0].sysRole.updateTime: null,   /** 更新时间    string required:false */
     lowerAddr[0].sysRole.remark: null,   /** 备注    string required:false */
     lowerAddr[0].parentCodeStr: null,   /** 父级代码字符串    string required:false */
     lowerAddr[0].createBy: null,   /**     string required:false */
     lowerAddr[0].createTime: null,   /**     string required:false */
     lowerAddr[0].updateBy: null,   /**     string required:false */
     lowerAddr[0].updateTime: null,   /**     string required:false */
     lowerAddr[0].remark: null,   /**     string required:false */
     sysRole.roleId: null,   /** 角色ID    string required:false */
     sysRole.roleName: null,   /** 角色名称    string required:false */
     sysRole.roleKey: null,   /** 角色权限    string required:false */
     sysRole.roleSort: null,   /** 角色排序    string required:false */
     sysRole.dataScope: null,   /** 数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限）    string required:false */
     sysRole.menuCheckStrictly: null,   /** 菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示）    string required:false */
     sysRole.deptCheckStrictly: null,   /** 部门树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ）    string required:false */
     sysRole.status: null,   /** 角色状态（0正常 1停用）    string required:false */
     sysRole.delFlag: null,   /** 删除标志（0代表存在 2代表删除）    string required:false */
     sysRole.flag: null,   /** 用户是否存在此角色标识 默认不存在    string required:false */
     sysRole.menuIds[0]: null,   /** 菜单组    string required:false */
     sysRole.deptIds[0]: null,   /** 部门组（数据权限）    string required:false */
     sysRole.searchValue: null,   /** 搜索值    string required:false */
     sysRole.createBy: null,   /** 创建者    string required:false */
     sysRole.createTime: null,   /** 创建时间    string required:false */
     sysRole.updateBy: null,   /** 更新者    string required:false */
     sysRole.updateTime: null,   /** 更新时间    string required:false */
     sysRole.remark: null,   /** 备注    string required:false */
     parentCodeStr: null,   /** 父级代码字符串    string required:false */
     createBy: null,   /**     string required:false */
     createTime: null,   /**     string required:false */
     updateBy: null,   /**     string required:false */
     updateTime: null,   /**     string required:false */
     remark: null,   /**     string required:false */
   }
    
export function businessRuralAddrCascader_Get( businessRuralAddrCascader_Param    ) {
    return request({
         url:`/business/ruralAddr/cascader`,
         method:'get',
                     params:businessRuralAddrCascader_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /business/ruralAddr/${businessRuralAddrids_Param["ids"]}
  * summary: 删除五级联动地址数据
 * tags: 新 级联动地址数据(后台管理)
 */
let businessRuralAddrids_Param = {
     ids: null,   /**     string required:true */
   }
    
export function businessRuralAddrids_Delete( businessRuralAddrids_Param    ) {
    return request({
         url:`/business/ruralAddr/${businessRuralAddrids_Param["ids"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /business/ruralAddr
  * summary: 新增五级联动地址数据
 * tags: 新 级联动地址数据(后台管理)
 */
let businessRuralAddr_Body = {
      sysRole: null,   /** 用户角色   object required: */
      level: null,   /** 等级   integer required: */
      parentCodeStr: null,   /** 父级代码字符串   string required: */
      cityCode: null,   /** 城市代码   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      type: null,   /** 类型   string required: */
      officialCode: null,   /** 官方代码   string required: */
      createBy: null,   /** $property.description   string required: */
      parentCode: null,   /** 父级代码   integer required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      oldName: null,   /** 原名称   string required: */
      lowerAddr: null,   /** 下级地址   array required: */
      name: null,   /** 名称   string required: */
      property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村   integer required: */
      parentAddr: null,   /** 父级地址   object required: */
      id: null,   /** $column.columnComment   integer required: */
    }
    
export function businessRuralAddr_Post(   businessRuralAddr_Body) {
    return request({
         url:`/business/ruralAddr`,
         method:'post',
                      
                 data: businessRuralAddr_Body
    })
}
/**  =========================================================================== ***/
