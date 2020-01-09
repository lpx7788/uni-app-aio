//暗黑模式
function DarkModeTheme(){
	uni.setNavigationBarColor({
		frontColor: '#ffffff',
		backgroundColor: '#1e1e1e',
	})
	uni.setTabBarStyle({
	  color: '#FFFFFF',
	  backgroundColor: '#000000',
	    borderStyle:'white'
	})
}

// 普通模式
function CommonPatternTheme(){
	uni.setNavigationBarColor({
	    frontColor: '#000000',
	    backgroundColor: '#FFFFFF',
	})
	uni.setTabBarStyle({
	  color: '#8A8396',
	  backgroundColor: '#FFFFFF',
	  borderStyle:'white'
	})
}

export default {
	DarkModeTheme,
	CommonPatternTheme
};