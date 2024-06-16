<template>
  <div class="auth-container">
    <main>
      <section>
        <router-view></router-view>
      </section>
    </main>
    <footer class="md-hide">
      <nav class="footer_content">
        <ul class="footer_menu">
          <li>
            <router-link to="/terms-of-service" target="_blank"
              >OPUS SaaS agreement</router-link
            >
          </li>
          <li>
            <a
              href="https://www.emergobyul.com/terms-of-use?action"
              target="_blank"
              >Emergo by UL Terms of Use</a
            >
          </li>
          <li>
            <a href="https://www.emergobyul.com/privacy-policy" target="_blank"
              >Privacy Policy</a
            >
          </li>
        </ul>
        <ul class="footer-copyright">
          <li>© {{ getFullYear() }} EMERGO by UL. All rights reserved.</li>
        </ul>
      </nav>
    </footer>
  </div>
</template>
<script>
import dayjs from 'dayjs';
// import NotificationBanner from '../SystemNotifications/NotificationBanner.vue';
// import { getActiveBanner } from '../../apis/systemNotifications';

export default {
  data() {
    return {
      // banners: [],
    };
  },
  components: {
    // NotificationBanner,
  },
  methods: {
    getFullYear() {
      return dayjs().format('YYYY');
    }
  }
  // async created() {
  //   this.banners = await getActiveBanner();
  // },
};
</script>
<style scoped>
.auth-container {
  position: relative;
  padding-bottom: 58px;
  min-height: 100vh;
}

footer {
  border-top: 1px solid #bdbdbd;
  text-align: center;
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.logo-img {
  width: 110px;
}
.hide_banner ~ .banner-container,
.hide_banner ~ .security_logos {
  display: none;
}
.banner-container {
  margin: 30px auto 20px;
}
#burger_menu[aria-expanded='true'] > div.x {
  transform: rotate(45deg);
  transform-origin: top left;
}
#burger_menu[aria-expanded='true'] > div.y {
  background: #ffffff;
}
#burger_menu[aria-expanded='true'] > div.z {
  transform: rotate(-45deg);
  transform-origin: bottom left;
  margin: 7px 5px 5px 5px;
}
#burger_menu {
  padding-top: 25px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  z-index: 1;
  appearance: none;
}
div.x,
div.y,
div.z {
  height: 3px;
  width: 26px;
  margin: 5px;
  background: #0b3c61;
  border-radius: 2px;
  -webkit-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}
.navbar-inverse .navbar-nav > li > a:focus,
.navbar-inverse .navbar-nav > li > a:hover {
  background-color: #0b3c61;
}
.navbar-inverse .navbar-nav > li > .button_login,
.navbar-inverse .navbar-nav > li > .button_login:focus,
.navbar-inverse .navbar-nav > li > .button_login:active {
  background: #ffffff;
  border: 2px solid #0b3c61;
  color: #0b3c61;
}
.navbar-inverse .navbar-nav > li > .button_login:hover {
  background-color: #ffffff;
  border-color: #0b3c61;
  color: #0b3c61;
  box-shadow: none;
}
.button_signup {
  border: 2px solid transparent;
  background: #4c9e45;
  color: #ffffff !important;
}
.navbar-inverse .navbar-nav > li > .button_signup:focus,
.navbar-inverse .navbar-nav > li > .button_signup:active,
.navbar-inverse .navbar-nav > li > .button_signup:hover {
  border: 2px solid transparent;
  background: #4c9e45;
  box-shadow: none;
}
.navbar-inverse .navbar-nav > li > a {
  color: #0b3c61;
  opacity: 1;
}
.btn {
  padding: 7px 30px 8px 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 700;
}
#logo {
  display: block;
  max-width: 130px;
  max-height: 73px;
}
.display_xs {
  display: none;
}
.mr-rt-30 {
  margin-right: 30px;
}
/* header, footer and main block --------- */
.footer_menu {
  padding: 12px 0px 0px 0px;
}
.footer_menu > li {
  margin-right: 40px;
  padding-right: 40px;
}
.footer_menu > li > a {
  color: #0b3c61;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 5px;
}
.footer_menu > li > a:hover {
  border-bottom: 2px solid #0b3c61;
}
.footer-copyright {
  color: #0b3c61;
  font-size: 10px;
  padding: 5px;
}
.footer_content > .footer-copyright {
  margin-bottom: 0px;
}
.footer-copyright > li {
  padding-right: 14px;
}
.footer_content {
  text-align: center;
}
.footer_content > ul {
  white-space: nowrap;
  list-style: none;
  margin: 10px;
}
.footer_content > ul > li {
  display: inline;
}
.navbar-nav.hide_xs {
  padding-top: 25px;
  margin-right: 20px;
}
.page_wrapper .container-fluid .navbar-header {
  padding-top: 10px;
  margin-left: 10px;
}
/* .navbar-inverse,
footer {
  height: 90px;
  background: #FFFFFF;
  border-color: #FFFFFF;
} */
.navbar-inverse {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.navbar-inverse .navbar-nav {
  border: none;
  background: #ffffff;
  float: right;
}
#burger_menu {
  float: right;
}
/* .page_wrapper {
  position: relative;
} */
/* main {
  min-height: 100vh;
  padding-bottom: 90px;
  padding-top: 90px;
  position: relative;
  margin: 0;
} */
/* footer {
  border-top: 0.5px solid #BDBDBD;
  position: absolute;
  width: 100%;
} */
/* footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: 4px 5px 10px 10px rgba(0, 0, 0, 0.25);
} */
@media (min-width: 375px) and (max-width: 767px) {
  .security_logos span.azure_security_text {
    font-size: 12px;
    float: right;
    padding-top: 2px;
    right: 0;
  }
  .security_logos span img.azure_security_logo {
    width: 31px;
  }
  .security_logos span img.azure_logo {
    width: 95px;
  }
  .security_logos span img.encrypt_logo {
    width: 80px;
    margin-right: 0px;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .security_logos span img.encrypt_logo {
    width: 120px;
    margin-right: 0px;
  }
  .security_logos span img.azure_logo {
    width: 140px;
  }
  .security_logos span img.azure_security_logo {
    width: 50px;
  }
  .security_logos span.azure_security_text {
    padding-top: 8px;
    float: right;
    font-weight: 600;
    font-size: 15px;
  }
}
@media screen and (max-width: 374px) {
  .security_logos span img.encrypt_logo {
    width: 75px;
    margin-right: 0px;
  }
  .security_logos span img.azure_logo {
    width: 85px;
  }
  .security_logos span img.azure_security_logo {
    width: 28px;
    margin-bottom: 0px;
  }
  .security_logos span.azure_security_text {
    font-size: 8px;
    float: right;
    margin-top: 3px;
    font-weight: 600;
    right: 0;
    padding-bottom: 1;
  }
}
@media screen and (min-width: 1025px) {
  .security_logos {
    margin-bottom: 10px;
  }
  .mobile-menu {
    display: none;
  }
  .security_logos span.azure_security_text {
    float: right;
    padding-top: 12px;
    margin-left: -5px;
    font-size: 16px;
  }
  .security_logos span img.encrypt_logo {
    width: 140px;
    margin-right: 15px;
  }
  .security_logos span img.azure_logo {
    width: 160px;
  }
  .security_logos span img.azure_security_logo {
    width: 55px;
  }
  #NavBar_DropDown {
    display: none;
  }
}

.mobile-menu {
  position: absolute;
  width: 100%;
  z-index: 1;
  background-image: url('/static/images/logos/sign-in.png');
}
@media screen and (max-width: 1024px) {
  .display_xs {
    display: block;
  }
  /* .hide_xs {
    display: none;
  } */
  .md-hide {
    display: none;
  }
  .auth-container {
    padding-bottom: 0px;
  }
  .navbar-inverse .navbar-nav {
    float: unset;
  }
  #NavBar_DropDown > li {
    float: unset;
  }
  .navbar-header {
    float: left;
  }
  #NavBar_DropDown {
    margin: 89px -15px 0;
    height: 100vh;
    padding-left: 15px;
  }
  main {
    padding-bottom: 0px;
  }
}
</style>
