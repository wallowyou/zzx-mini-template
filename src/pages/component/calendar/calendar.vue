<template>
    <view>
        <calendar @selected-change="selectDate" @days-change="daysChange"/>
    </view>
</template>

<script>
import calendar from '../../../components/zzx-calendar/zzx-calendar';

export default {
    components: {
        calendar 
    },
    data() {
        return {}
    },
	methods: {
		selectDate(e) {
			console.log(e);
		},
		daysChange(e) {
			console.log(e)
		}
	}
}
</script>

<style>

</style>