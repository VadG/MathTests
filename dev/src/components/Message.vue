<template>
    <div class="row">
        <div class="col-md-12">
            <div :class="'alert-'+ type" class="text-center">
                <h3>{{text}}</h3>
                <div class="row">
                    <div class="btn-toolbar col-sm-4 offset-sm-4">
                        <button class="btn btn-info message-btn" @click='$emit("onNext")'>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
 export default {
 	props:['type','text'],
 	data : ()=>({
 	})
};
</script>

<style >
.message-btn{
	margin:20px auto;
} 
</style>
