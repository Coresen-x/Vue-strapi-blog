<template>
    <div class="about-wrapper">
      <div class="about-left">
        <div class="about-left-content">
          <div>
            <div class="shadow">
              <div class="about-img">
                <img :src="avatarUrl" alt="about image" />
              </div>
            </div>
            <h2>{{ name }}</h2>
            <h3>{{ title }}</h3>
          </div>
        </div>
      </div>
  
      <div class="about-right">
        <h1>Hello<span>!</span></h1>
  
        <div class="about-para">
          <p>Wishing you happiness, my friend.</p>
        </div>
        <div class="credit">
          <span style="color:tomato">Life Essays：</span>
          <router-link to="/exist-and-life">
            云边语 The cloud in the rain❤
          </router-link>
        </div>
      </div>
  
      <!-- Return Button -->
      <div class="return-button">
        <button @click="goBack" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Return
        </button>
      </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const avatarUrl = require('./image/pic.jpg');
const name = "Core sen";

function goBack() {
  router.push('/');
}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Poppins', sans-serif;
}
.about-wrapper {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  position: relative;
}
.about-left {
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.about-left-content > div {
  background: #12192c;
  padding: 4rem 4rem 2.5rem 5rem;
  text-align: center;
  border-radius: 12px 12px 0 0;
}
.about-left-content {
  box-shadow: 0px 0px 18px -1px rgba(0, 0, 0, 0.39);
  border-radius: 12px;
  width: 80%;
}
.about-img img {
  display: block;
  width: 200px;
  transition: all 0.5s ease-in-out;
}
.about-img {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}
.shadow {
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
.about-left-content h2 {
  font-size: 2rem;
  margin: 2.2rem 0 0.6rem 0;
  line-height: 1.2;
  padding-bottom: 1rem;
  border-bottom: 2px solid #b721ff;
}
.about-left-content h3 {
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 5px;
  margin-top: 1.2rem;
}
.icons {
  background: #12192c;
  display: flex;
  justify-content: center;
  padding: 0.8rem 0;
  border-radius: 0 0 12px 12px;
}
.icons li {
  list-style-type: none;
  background: #b721ff;
  color: #fff;
  width: 40px;
  height: 40px;
  margin: 0 0.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}
.icons li:hover {
  background: #edffec;
  color: #000;
}
.about-right {
  background: #12192c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5rem;
  text-align: center;
  color: #fff;
}
.about-right h1 {
  font-size: 5rem;
  text-transform: uppercase;
}
.about-right h1 span {
  color: #b721ff;
}
.about-right h2 {
  font-weight: 600;
}
.about-btns {
  display: flex;
  margin: 2rem 0;
}
.btn {
  border: none;
  font-size: 0.9rem;
  text-transform: uppercase;
  border: 2px solid #fff;
  border-radius: 20px;
  padding: 0.55rem 0;
  width: 130px;
  font-weight: 600;
  background: transparent;
  margin: 0 0.5rem;
  cursor: pointer;
  color: #fff;
}
.btn.btn-pink {
  background: #b721ff;
  color: #fff;
  border-color: #b721ff;
  transition: all 0.5s ease-in-out;
}
.btn.btn-pink:hover {
  background: transparent;
  border-color: #fff;
  color: #fff;
}
.btn.btn-white {
  transition: all 0.5s ease-in-out;
}
.btn.btn-white:hover {
  background: #b721ff;
  border-color: #b721ff;
  color: #fff;
}
.about-para p {
  font-weight: 300;
  padding: 0.5rem;
  opacity: 0.8;
}
.credit {
  text-align: center;
  color: #fff;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.credit a {
  text-decoration: none;
  color: #b721ff;
  font-weight: bold;
}
.return-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>