<template>
	<view class="">
		<view class="content_qa">
			<u-collapse
			  :value="[open]"
			  :border="false"
			>
			  <u-collapse-item
			    :title="(index+1)+' '+item.title"
			    :name="index"
				v-for="(item,index) in qaList" :key="index"
			  >
			    <view class="desc">
			    	<text>{{item.content}}</text>
			    </view>
			  </u-collapse-item>
			  
			</u-collapse>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				open:0,
				qaList:[
					{
						title:'乡村名片收费吗？',
						name:'',
						content:'乡村名片平台目前是免费开放点亮，如果乡村名片数据存储及流量超过规定限额，平台可能会对名片提供有偿扩容或访问人数限制。'
					},
					{
						title:'什么是乡村共建者？有什么区别？',
						name:'',
						content:'名片角色除村民外，共建者是指非本村村民但是自愿加入乡村名片共建的用户，例如：教师、科研者、旅游爱好者或当地对该村比较了解的用户，共建者可辅助或帮助名片管理员完善乡村名片内容。区别:共建者无法使用具有村民属性的功能，例如：好物/服务发布'
					},
					{
						title:'可以加入多个乡村吗？',
						name:'',
						content:'可以的，乡村名片支持用户以不同的身份加入多个乡村，但最多只能以村民的身份加入3个乡村。'
					},
					{
						title:'账号显示禁止登录需要解封？',
						name:'',
						content:'平台会对用户内容进行安全风控筛查，如发现用户恶意发布广告、滥用名片加入功能、发布不实消息(多次被名片管理员以不实消息驳回)等，我们会对账号及账号所属的设备、IP、微信OpenID、微信Unid进行拉黑及暂时下架该用户发布过所有内容，用户可联系客服，提供资料，申请解封。'
					},
					{
						title:'如何申请乡村名片管理员？',
						name:'',
						content:'可以先点亮/加入乡村，在乡村名片-我的页-左上角装修名片进入，只有当前名片上线后才显示申请页，申请管理员具体要求可详见管理员申请页。'
					},
					{
						title:'乡村名片里面的信息在哪里修改？',
						name:'',
						content:'如果乡村未发布，在乡村名片-我的页-左上角装修名片进入，人人都可以修改乡村名片内容，如果乡村已发布上线，仅乡村管理员才可以修改。'
					},
					{
						title:'乡村名片有广告吗？',
						name:'',
						content:'乡村名片页上面没有广告，用户可以沉浸式体验乡村内容。'
					}
				]
			};
		},

		onLoad() {

		},
		methods: {
		},
	}
</script>

<style lang="scss">
	page{
		background: #f1f1f1;
	}
	.content_qa{
		margin: 30rpx;
		background: #fff;
		border-radius: 20rpx;
		.desc{
			padding: 15rpx 25rpx;
			background: #f1f1f1;
			border-radius: 15rpx;
		}
	}
</style>