export function getRule() {
	return {
		appId: [{
				required: true,
				message: '请填写外部小程序AppID',
				trigger: ['blur', 'change']
			},
			{
				validator: (rule, value, callback) => {
					return uni.$u.test.contains(value, "wx");
				},
				message: '小程序AppID不合法'
			}
		],
		path: [{
				type: 'string',
				required: true,
				message: '请填外部小程序跳转路径',
				trigger: ['blur', 'change']
			},
			{
				validator: (rule, value, callback) => {
					return uni.$u.test.contains(value, "/");
				},
				message: '跳转路径不合法'
			}
		]
	}
}


export function getTagList() {
	return [{
			name: '资讯模块',
			type: 4,
			page: 0,
			tags: 0,
			list: {}
		},
		{
			name: '坐标模块',
			type: 5,
			page: 0,
			tags: 0,
			list: {}
		},
		{
			name: '好物模块',
			type: 6,
			page: 0,
			tags: 0,
			list: {}
		},
		{
			name: '图集模块',
			type: 7,
			page: 0,
			tags: 0,
			list: {}
		}
	]
}
