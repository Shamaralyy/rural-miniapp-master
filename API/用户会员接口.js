
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/member/updateinvitationCode
  * summary: 更新邀请码
 * tags: 用户 会员 接口
 */
    
export function apiBusinessMemberUpdateinvitationCode_Post(   ) {
    return request({
         url:`/api/business/member/updateinvitationCode`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/decryptPhone
  * summary: 解析手机号
 * tags: 用户 会员 接口
 */
    
export function apiBusinessMemberDecryptPhone_Post(   ) {
    return request({
         url:`/api/business/member/decryptPhone`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/list
  * summary: 分页查询用户会员列表
 * tags: 用户 会员 接口
 */
let apiBusinessMemberList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessMemberList_Body = {
      ksUnionId: null,   /** 快手 unionid   string required: */
      dyOpenId: null,   /** 抖音openid   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      userId: null,   /** 用户信息ID   integer required: */
      platform: null,   /** 平台(1:微信小程序,2:微信公众号,3:抖音小程序,4:快手小程序)   string required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      appId: null,   /** appID   string required: */
      dyUnionId: null,   /** 抖音unionid   string required: */
      ksOpenId: null,   /** 快手 openid   string required: */
      memberId: null,   /** 用户会员ID   integer required: */
      status: null,   /** 状态(1正常,0禁用)   integer required: */
    }
        
export function apiBusinessMemberList_Post( apiBusinessMemberList_Param  , apiBusinessMemberList_Body) {
    return request({
         url:`/api/business/member/list`,
         method:'post',
                     params:apiBusinessMemberList_Param ,
                 data: apiBusinessMemberList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/info
  * summary: 获取用户会员详细信息
 * tags: 用户 会员 接口
 */
    
export function apiBusinessMemberInfo_Get(   ) {
    return request({
         url:`/api/business/member/info`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/wx/login
  * summary: 微信登录
 * tags: 用户 会员 接口
 */
let apiBusinessMemberWxLogin_Param = {
     wxCode: null,   /** 登录信息    string required:false */
   }
    
export function apiBusinessMemberWxLogin_Post( apiBusinessMemberWxLogin_Param    ) {
    return request({
         url:`/api/business/member/wx/login`,
         method:'post',
                     params:apiBusinessMemberWxLogin_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/loginWx
  * summary: 微信一键登录
 * tags: 用户 会员 接口
 */
let apiBusinessMemberLoginWx_Body = {
      wxCode: null,   /** 微信临时登录码   string required: */
      appId: null,   /** 微信 appid   string required: */
      encryptedData: null,   /** encryptedData   string required: */
      iv: null,   /** iv   string required: */
    }
    
export function apiBusinessMemberLoginWx_Post(   apiBusinessMemberLoginWx_Body) {
    return request({
         url:`/api/business/member/loginWx`,
         method:'post',
                      
                 data: apiBusinessMemberLoginWx_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/registerUser
  * summary: 用户注册
 * tags: 用户 会员 接口
 */
let apiBusinessMemberRegisterUser_Body = {
      password: null,   /** 密码   string required: */
      wxCode: null,   /** 微信临时登录码   string required: */
      nickName: null,   /** 用户昵称   string required: */
      sex: null,   /** 用户性别   string required: */
      appId: null,   /** appid   string required: */
      avatar: null,   /** 用户头像   string required: */
      userName: null,   /** 用户账号 -就是手机号   string required: */
    }
    
export function apiBusinessMemberRegisterUser_Post(   apiBusinessMemberRegisterUser_Body) {
    return request({
         url:`/api/business/member/registerUser`,
         method:'post',
                      
                 data: apiBusinessMemberRegisterUser_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/contribute
  * summary: 统计贡献
 * tags: 用户 会员 接口
 */
    
export function apiBusinessMemberContribute_Get(   ) {
    return request({
         url:`/api/business/member/contribute`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/username/del
  * summary: 删除用户
 * tags: 用户 会员 接口
 */
let apiBusinessMemberUsernameDel_Param = {
     memberId: null,   /** 会员ID    string required:false */
   }
    
export function apiBusinessMemberUsernameDel_Post( apiBusinessMemberUsernameDel_Param    ) {
    return request({
         url:`/api/business/member/username/del`,
         method:'post',
                     params:apiBusinessMemberUsernameDel_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/username/login
  * summary: 密码登录
 * tags: 用户 会员 接口
 */
let apiBusinessMemberUsernameLogin_Body = {
      password: null,   /** 用户密码   string required: */
      username: null,   /** 用户名   string required: */
    }
    
export function apiBusinessMemberUsernameLogin_Post(   apiBusinessMemberUsernameLogin_Body) {
    return request({
         url:`/api/business/member/username/login`,
         method:'post',
                      
                 data: apiBusinessMemberUsernameLogin_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/loginWxRegister
  * summary: 微信一键登录2 直接传头像
 * tags: 用户 会员 接口
 */
let apiBusinessMemberLoginWxRegister_Body = {
      wxCode: null,   /** 微信临时登录码   string required: */
      nickName: null,   /** 昵称   string required: */
      appId: null,   /** 微信 appid   string required: */
      sex: null,   /** 性别   string required: */
      encryptedData: null,   /** encryptedData   string required: */
      avatar: null,   /** 头像   string required: */
      iv: null,   /** iv   string required: */
      invitationCode: null,   /** 邀请码   string required: */
    }
    
export function apiBusinessMemberLoginWxRegister_Post(   apiBusinessMemberLoginWxRegister_Body) {
    return request({
         url:`/api/business/member/loginWxRegister`,
         method:'post',
                      
                 data: apiBusinessMemberLoginWxRegister_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/registerWx
  * summary: 微信一键注册
 * tags: 用户 会员 接口
 */
let apiBusinessMemberRegisterWx_Body = {
      wxCode: null,   /** 微信临时登录码   string required: */
      appId: null,   /** 微信 appid   string required: */
      encryptedData: null,   /** encryptedData   string required: */
      iv: null,   /** iv   string required: */
    }
    
export function apiBusinessMemberRegisterWx_Post(   apiBusinessMemberRegisterWx_Body) {
    return request({
         url:`/api/business/member/registerWx`,
         method:'post',
                      
                 data: apiBusinessMemberRegisterWx_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/loginDyAndKsRegister
  * summary: 抖音/快手登录(注册)
 * tags: 用户 会员 接口
 */
let apiBusinessMemberLoginDyAndKsRegister_Body = {
      code: null,   /** code   string required: */
      encryptedData: null,   /** encryptedData   string required: */
      type: null,   /** 平台(1.抖音,2.快手)   number required: */
      iv: null,   /** iv   string required: */
      invitationCode: null,   /** 邀请码   string required: */
    }
    
export function apiBusinessMemberLoginDyAndKsRegister_Post(   apiBusinessMemberLoginDyAndKsRegister_Body) {
    return request({
         url:`/api/business/member/loginDyAndKsRegister`,
         method:'post',
                      
                 data: apiBusinessMemberLoginDyAndKsRegister_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/invitation
  * summary: 填写邀请码获得积分
 * tags: 用户 会员 接口
 */
let apiBusinessMemberInvitation_Param = {
     invitationCode: null,   /**     string required:false */
   }
    
export function apiBusinessMemberInvitation_Post( apiBusinessMemberInvitation_Param    ) {
    return request({
         url:`/api/business/member/invitation`,
         method:'post',
                     params:apiBusinessMemberInvitation_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/edit
  * summary: 修改用户信息
 * tags: 用户 会员 接口
 */
let apiBusinessMemberEdit_Body = {
      password: null,   /** 密码   string required: */
      nickName: null,   /** 用户昵称   string required: */
      sex: null,   /** 用户性别   string required: */
      avatar: null,   /** 用户头像   string required: */
      email: null,   /** 用户邮箱   string required: */
    }
    
export function apiBusinessMemberEdit_Put(   apiBusinessMemberEdit_Body) {
    return request({
         url:`/api/business/member/edit`,
         method:'put',
                      
                 data: apiBusinessMemberEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/member/username/count
  * summary: 查看用户数量
 * tags: 用户 会员 接口
 */
    
export function apiBusinessMemberUsernameCount_Post(   ) {
    return request({
         url:`/api/business/member/username/count`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/
