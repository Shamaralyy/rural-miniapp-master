
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/store/download
  * summary: 通用下载请求
 * tags: 文件上传存储
 */
let apiStoreDownload_Param = {
     fileName: null,   /** 文件名称    string required:false */
     delete: null,   /** 是否删除    string required:false */
   }
    
export function apiStoreDownload_Get( apiStoreDownload_Param    ) {
    return request({
         url:`/api/store/download`,
         method:'get',
                     params:apiStoreDownload_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/store/upload
  * summary: 通用上传请求（单个）
 * tags: 文件上传存储
 */
    
export function apiStoreUpload_Post(   ) {
    return request({
         url:`/api/store/upload`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/store/ossUploadFile
  * summary: OSS获得上传图片签名
 * tags: 文件上传存储
 */
let apiStoreOssUploadFile_Param = {
     dir: null,   /** 上传图片到哪个文件夹 示例: logo/    string required:false */
   }
    
export function apiStoreOssUploadFile_Get( apiStoreOssUploadFile_Param    ) {
    return request({
         url:`/api/store/ossUploadFile`,
         method:'get',
                     params:apiStoreOssUploadFile_Param  
                
    })
}
/**  =========================================================================== ***/
