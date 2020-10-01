<template>
    <div style="display:contents">
        <button class="fb btn" @click="logInWithFacebook">
            <img src="@/assets/images/fb-logo.svg" alt="">
            {{title}}</button>
    </div>
</template>
<script>
    import { FbAppId } from '../config'
    import {fbMixin} from '../mixins/fbMixin';
    import { mixins } from 'vue-chartjs';
    export default {
        name:"facebookLogin",
        props: ['title'],
        mixins: [fbMixin]
    };
</script>
<style>
    .btn {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 4px;
        margin: 5px 0;
        opacity: 0.85;
        display: inline-block;
        font-size: 17px;
        line-height: 20px;
        text-decoration: none; /* remove underline from anchors */
    }
    .fb {
        background-color: #3B5998;
        color: white;
    }
</style>