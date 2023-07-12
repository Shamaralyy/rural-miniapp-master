/* diy模块默认缺省数据 */
const imgBaseUrl = getApp().globalData.imgBaseUrl + '/app';
const news = {
	data_list: [1, 2, 3].map(value => {
		return {
			urls: [{
				imgUrl: imgBaseUrl + '/static/rural_news_1.png'
			}],
			title: `${value}：这里显示文章标题`,
		}
	})
}
const food = {
	data_list: [{
			urls: [{
				imgUrl: imgBaseUrl + '/static/zanba.jpg'
			}],
			title: '糌粑',
			synopsis: '糌粑是当地的一种主食，是用青稞或豌豆等炒熟之后磨成的面粉。糌粑的食用方式很有特色，当地人—般是伴着酥油茶用手捏成团直接食用，根据个人口味，也可以配着盐茶、酸奶或青稞酒一起。'
		},
		{
			urls: [{
				imgUrl: imgBaseUrl + '/static/zanba.jpg'
			}],
			title: '麻薯',
			synopsis: '麻薯是当地的一种主食，是用青稞或豌豆等炒熟之后磨成的面粉。糌粑的食用方式很有特色，当地人—般是伴着酥油茶用手捏成团直接食用，根据个人口味，也可以配着盐茶、酸奶或青稞酒一起。'
		},
		{
			urls: [{
				imgUrl: imgBaseUrl + '/static/zanba.jpg'
			}],
			title: '番薯',
			synopsis: '番薯是当地的一种主食，是用青稞或豌豆等炒熟之后磨成的面粉。糌粑的食用方式很有特色，当地人—般是伴着酥油茶用手捏成团直接食用，根据个人口味，也可以配着盐茶、酸奶或青稞酒一起。'
		},
		{
			urls: [{
				imgUrl: imgBaseUrl + '/static/zanba.jpg'
			}],
			title: '菠萝',
			synopsis: '菠萝是当地的一种主食，是用青稞或豌豆等炒熟之后磨成的面粉。糌粑的食用方式很有特色，当地人—般是伴着酥油茶用手捏成团直接食用，根据个人口味，也可以配着盐茶、酸奶或青稞酒一起。'
		},
		{
			urls: [{
				imgUrl: imgBaseUrl + '/static/zanba.jpg'
			}],
			title: '榴莲',
			synopsis: '榴莲是当地的一种主食，是用青稞或豌豆等炒熟之后磨成的面粉。糌粑的食用方式很有特色，当地人—般是伴着酥油茶用手捏成团直接食用，根据个人口味，也可以配着盐茶、酸奶或青稞酒一起。'
		},
		{
			urls: [{
				imgUrl: imgBaseUrl + '/static/zanba.jpg'
			}],
			title: '芒果',
			synopsis: '芒果是当地的一种主食，是用青稞或豌豆等炒熟之后磨成的面粉。糌粑的食用方式很有特色，当地人—般是伴着酥油茶用手捏成团直接食用，根据个人口味，也可以配着盐茶、酸奶或青稞酒一起。'
		}
	],
	footinfo: '',
	footon: 0
}

const guide = {
	data_list: [1, 2, 3].map(value => {
		return {
			id: value,
			name: '这里显示标题',
			urls: [{
				imgUrl: imgBaseUrl + '/static/rural_guide_1.png'
			}],
			type: '1',
			url: ''
		}
	})
}
/* 备选字段
 tagName: "环境"
 detail: "大慈寺是喜洲历史上的文化中心,以殿宇众多、松柏森森、花气袭人、幽静安宁著称,现占地20亩,一进四院。大慈寺是喜洲历史上的文化中心,以殿宇众多、松柏森森、花气袭人、幽静安宁著称,现占地20亩,一进四院。"
 image: urls[0].imgUrl 
 */

const diy08 = {
	left_list: [{
			img: "https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20",
			title: "这里显示标题名称",
		},
		{
			img: "https://api.xiangcunmingpian.com/images/89314/z_53290110401.JZ002-P162.jpg",
			title: "佛寺额的水电费",
		},
		{
			img: "https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20",
			title: "佛寺额的水电费",
		},
		{
			img: "https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20",
			title: "佛寺额的水电费",
		},
	],
	right_list: [{
			img: "https://api.xiangcunmingpian.com/images/89314/z_53290110401.JZ002-P162.jpg",
			title: "佛寺额的水电费",
		},
		{
			img: "https://cdn.xiangcunmingpian.com/ruralImg/53290110401/8003ae9ec6974af29a38e451ff50c3f6.jpg?x-oss-process=style/p20",
			title: "佛寺额的水电费",
		},
		{
			img: "https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20",
			title: "佛寺额的水电费",
		},
		{
			img: "https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20",
			title: "佛寺额的水电费",
		},
	],
}
const diy07 = {
	swipersd: [1, 2, 3, 4, 5].map((val, index) => {
		return {
			img: 'https://cdn.xiangcunmingpian.com/ruralImg/53290110401/672be5de628c4f0b87469db9ee50be60.jpg?x-oss-process=style/p20',
			title: '这里显示标题' + index,
			subtitle: '这里显示标题的介绍' + index
		}
	})
}

const diy09 = {
	winterData: {
		cloud: "91",
		dew: "16",
		feelsLike: "22",
		humidity: "75",
		icon: "100",
		obsTime: "2022-08-21T11:36+08:00",
		precip: "0.0",
		pressure: "802",
		temp: "22",
		text: "晴",
		vis: "30",
		wind360: "0",
		windDir: "北风",
		windScale: "2",
		windSpeed: "10"
	}
}

export function diy_DefaultData(type) {
	const dataList = {
		news,
		food,
		guide,
		'ru-diy01': news,
		'ru-diy02': news,
		'ru-diy03': news,
		'ru-diy04': news,
		'ru-diy05': news,
		'ru-diy06': news,
		'ru-diy07': diy07,
		'ru-diy08': diy08,
		'ru-diy09': diy09,
	}
	return dataList[type]
}
