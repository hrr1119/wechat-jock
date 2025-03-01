// 初始化参数
let rejectCount = 0;
const MAX_SCALE = 2.5;
const MIN_SCALE = 0.5;

// 倒计时函数
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetDate = new Date(currentYear, 1, 14); // 2月14日

    if (now > targetDate) {
        targetDate.setFullYear(currentYear + 1);
    }

    const diff = targetDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    document.getElementById('countdown').textContent = 
        `⏳ 下个情人节：${days}天${hours}小时`;
}

// 创建爱心
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.textContent = '💔';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
}

// 初始化事件
document.addEventListener('DOMContentLoaded', () => {
    // 启动倒计时
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60);

    // 音频控制
    const bgm = document.getElementById('bgm');
    document.body.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play().catch(() => {});
        }
    }, { once: true });

    // 点击特效
    document.addEventListener('click', (e) => {
        createHeart(e.clientX, e.clientY);
    });

    // 领取证书按钮
    document.getElementById('acceptBtn').addEventListener('click', () => {
        alert('你选择了从心之路！页面即将关闭~');
        window.close();
    });

    // 拒绝证书按钮
    document.getElementById('rejectBtn').addEventListener('click', () => {
        rejectCount++;
        
        const rejectBtn = document.getElementById('rejectBtn');
        const acceptBtn = document.getElementById('acceptBtn');
        
        // 动态调整大小
        const newRejectScale = Math.max(MIN_SCALE, 1 - rejectCount * 0.1);
        rejectBtn.style.transform = `scale(${newRejectScale})`;
        
        const newAcceptScale = Math.min(MAX_SCALE, 1 + rejectCount * 0.2);
        acceptBtn.style.transform = `scale(${newAcceptScale})`;
        
        // 更新按钮文字
        const taunts = [
            '就这？继续点！',
            '手抖了吗？',
            '放弃吧！',
            '你赢不了的！'
        ];
        rejectBtn.innerHTML = taunts[rejectCount % taunts.length];
    });
});