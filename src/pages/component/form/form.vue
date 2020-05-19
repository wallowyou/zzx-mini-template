<template>
	<view class="content">
		<form @submit="formSubmit" class="zzx-form">
			<view class="zzx-form-item">
				<view class="zzx-form-label">日程名称:</view>
				<view class="zzx-form-value">
					<input type="text" :value="sname" class="zzx-form-input" name="sname" placeholder="请输入日程名称" placeholder-style="color:#dddddd" @input="bindNameChange" />
				</view>
			</view>
			<view class="zzx-form-item">
				<view class="zzx-form-label">开始时间:</view>
				<view class="zzx-form-value">
					<picker mode="date" :value="date" @change="bindDateChange" name="date">
						<view class="zzx-picker-value" :class="date ? '' : 'zzx-picker-null'">{{date ? date : '请输入开始时间'}}</view>
					</picker>
				</view>
				<view class="zzx-form-arrow">
					<image src="../../../static/img/arrow.png" mode="" style="width: 18upx;height: 36upx;vertical-align: top;"></image>
				</view>
			</view>
			<view class="zzx-form-item">
				<view class="zzx-form-label">国家:</view>
				<view class="zzx-form-value">
					<checkbox-group @change="checkboxChange" name="countries">
						<label class="zzx-checkbox-label">
							<checkbox value="chineses" />中国
						</label>
						<label class="zzx-checkbox-label">
							<checkbox value="japanese" />日本
						</label>
						<label class="zzx-checkbox-label">
							<checkbox value="american" />美国
						</label>
					</checkbox-group>
				</view>
			</view>
			<view class="zzx-form-item">
				<view class="zzx-form-label">性别:</view>
				<view class="zzx-form-value">
					<radio-group @change="radioChange" name="sex">
						<label class="zzx-radio-label">	
							<radio value="man" :checked="this.sex === 'man'" />男
						</label>
						<label class="zzx-radio-label">
							<radio value="female" :checked="this.sex === 'female'"  />女
						</label>
					</radio-group>
				</view>
			</view>
			<view class="zzx-form-item">
				<button form-type="submit" class="zzx-form-btn" :disabled="isAllOk">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	const graceChecker = require("../../../utils/checker/graceChecker.js");
	export default {
		data() {
			return {
				sname: '',
				date: '',
				countries: [],
				sex: ''
			};
		},
		computed: {
			isAllOk() {
				if (this.sname === '' || this.date === '' || this.countries.length === 0 || this.sex === '') {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			formSubmit(e) {
				console.log(e);
				// 表单先验证
				const rule = [
					{name:"sname", checkType : "string", checkRule:"2,10",  errorMsg:"名称应为2-10个字符"},
					{name:"date", checkType : "notnull", checkRule:"",  errorMsg:"请选择国家"},
					{name:"countries", checkType : "notnull", checkRule:"",  errorMsg:"请选择开始时间"},
					{name:"sex", checkType : "notnull", checkRule:"",  errorMsg:"请选择性别"}
				];
				const formData = e.detail.value;
				const checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					 uni.showToast({title:"验证通过!", icon:"none"});
				} else {
					 uni.showToast({title:graceChecker.error, icon:"none"});
				}
			},
			bindDateChange(e) {
				this.date = e.target.value;
			},
			checkboxChange(e) {
				this.countries = e.target.value;
			},
			bindNameChange(e) {
				this.sname = e.target.value;
			},
			radioChange(e) {
				this.sex = e.target.value;
			}
		}
	}
</script>

<style lang="scss">

</style>
