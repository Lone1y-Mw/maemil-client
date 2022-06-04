<div class="footer">
    <div class="contact">
        <div class="title">메밀 고객센터</div>
        <div class="link">
            <a href="https://m.me/111462604917504" target="_blank">
                <div class="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><radialGradient id="a" cx="101.9" cy="809" r="1.1" gradientTransform="matrix(800 0 0 -800 -81386 648000)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#09f"/><stop offset=".6" style="stop-color:#a033ff"/><stop offset=".9" style="stop-color:#ff5280"/><stop offset="1" style="stop-color:#ff7061"/></radialGradient><path fill="url(#a)" d="M400 0C174.7 0 0 165.1 0 388c0 116.6 47.8 217.4 125.6 287 6.5 5.8 10.5 14 10.7 22.8l2.2 71.2a32 32 0 0 0 44.9 28.3l79.4-35c6.7-3 14.3-3.5 21.4-1.6 36.5 10 75.3 15.4 115.8 15.4 225.3 0 400-165.1 400-388S625.3 0 400 0z"/><path fill="#FFF" d="m159.8 501.5 117.5-186.4a60 60 0 0 1 86.8-16l93.5 70.1a24 24 0 0 0 28.9-.1l126.2-95.8c16.8-12.8 38.8 7.4 27.6 25.3L522.7 484.9a60 60 0 0 1-86.8 16l-93.5-70.1a24 24 0 0 0-28.9.1l-126.2 95.8c-16.8 12.8-38.8-7.3-27.5-25.2z"/></svg>
                </div>
            </a>
        </div>
    </div>
    <div class="contributors">
        <div class="title">제작 및 운영진</div>
        <div class="names">
            <!-- 3-1 -->
            <a href="">강동연</a>
            <a href="https://www.facebook.com/profile.php?id=100056053027942" target="_blank">김민규</a>
            <!-- 3-2 -->
            <a href="https://www.facebook.com/profile.php?id=100046960400174" target="_blank">김성진</a>
            <a href="" target="_blank">김세훈</a>
            <!-- 3-3 -->
            <a href="" target="_blank">노경완</a>
        </div>
        <div class="copyright">© 2022 NSMS Programmers. All rights reserved.</div>
    </div>
</div>

<style lang="scss">
    .footer {
        width: 85%;
        margin: 150px auto 100px;
        text-align: center;
        font-size: 14px;
        .contact {
            margin-bottom: 40px;
            .link {
                display: flex;
                justify-content: center;
                .link-icon {
                    width: 40px;
                    height: 40px;
                }
            }
        }
        .contributors {
            .names {
                color: $text-color-default;
                max-width: 450px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                margin-bottom: 7px;
                a {
                    color: $text-color-default;
                    text-decoration: underline;
                }
            }
            .copyright {
                color: $text-color-default;
                font-size: 12px;
            }
        }
    }
    .title {
        font-weight: bold;
        margin-bottom: 7px;
        color: $text-color-tick;
    }
</style>