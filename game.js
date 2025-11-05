let resourceCount = 0;
let upgradeCost = 10; // 업그레이드 초기 비용
let clickPower = 1;   // 클릭당 자원 증가량 (초기 1)
let generatorCost = 50; // 봉하마을 구매 비용
let generators = 0;  // 봉하마을 개수
let resourcePerSecond = 0; // 초당 생성되는 자원 수
let endingCost = 2000; // 엔딩 버튼을 위한 두부 비용

const resourceDisplay = document.getElementById('resourceCount');
const collectBtn = document.getElementById('collectBtn');
const upgradeBtn = document.getElementById('upgradeBtn');
const generatorBtn = document.getElementById('generatorBtn');
const endingBtn = document.getElementById('endingBtn');
const messageDisplay = document.createElement('p'); // 메시지를 표시할 요소 생성
document.body.appendChild(messageDisplay); // 페이지에 추가

// 봉하마을과 엔딩 버튼을 초기에는 보이게 설정
generatorBtn.style.display = "none";
endingBtn.style.display = "inline"; // 엔딩 버튼을 처음부터 보이도록 설정

// 두부 수집 (클릭)
collectBtn.addEventListener('click', addResource);

// 업그레이드 기능
upgradeBtn.addEventListener('click', () => {
    if (resourceCount >= upgradeCost) {
        resourceCount -= upgradeCost;  // 업그레이드 비용 차감
        upgradeCost = Math.floor(upgradeCost * 1.15); // 업그레이드 비용 상승
        resourceDisplay.textContent = resourceCount;
        
        // 업그레이드 비용을 버튼에 반영
        upgradeBtn.textContent = `업그레이드 (비용: ${upgradeCost} 두부)`;
        
        messageDisplay.textContent = `업그레이드 완료! 클릭 시 두부 +${clickPower + 1}로 증가!`;
        messageDisplay.style.color = "green"; // 메시지 색상: 초록

        // 업그레이드 후 클릭당 두부 증가량 증가
        clickPower++;  // 클릭당 두부 증가량 증가

        // 클릭당 두부 획득 수 업데이트
        collectBtn.removeEventListener('click', addResource);  // 기존 클릭 이벤트 제거
        collectBtn.addEventListener('click', addResourceWithUpgrade);  // 업그레이드된 클릭 이벤트 추가
    } else {
        messageDisplay.textContent = `두부가 부족합니다! 업그레이드를 위해서는 ${upgradeCost} 두부가 필요합니다.`;
        messageDisplay.style.color = "red"; // 메시지 색상: 빨간
    }

    // 클릭당 두부가 10 이상이 되면 봉하마을 구매 버튼 표시
    if (clickPower >= 10 && generators === 0) {
        generatorBtn.style.display = "inline"; // 봉하마을 버튼을 화면에 표시
    }

    // 두부 2000개 이상이면 엔딩 버튼 표시
    if (resourceCount >= endingCost) {
        endingBtn.style.display = "inline"; // 엔딩 버튼을 화면에 표시
    }
});

// 봉하마을 구매 기능
generatorBtn.addEventListener('click', () => {
    if (resourceCount >= generatorCost) {
        resourceCount -= generatorCost; // 봉하마을 구매 비용 차감
        generators++;  // 봉하마을 개수 증가
        resourcePerSecond = generators;  // 초당 두부 증가량 = 봉하마을 개수
        resourceDisplay.textContent = resourceCount;
        
        // 봉하마을 버튼은 숨기지 않음
        messageDisplay.textContent = `봉하마을 구매 완료! 초당 ${generators} 두부가 자동으로 생성됩니다.`;
        messageDisplay.style.color = "blue"; // 메시지 색상: 파란

        // 봉하마을 구매 후 초당 두부 생성 정보 업데이트
        generatorInfo.textContent = `초당 두부: ${resourcePerSecond}/s`;
    } else {
        messageDisplay.textContent = `두부가 부족합니다! 봉하마을을 위해서는 ${generatorCost} 두부가 필요합니다.`;
        messageDisplay.style.color = "red"; // 메시지 색상: 빨간
    }
});

// 엔딩 버튼 클릭 시 엔딩 이미지 표시
endingBtn.addEventListener('click', () => {
    if (resourceCount >= endingCost) {  // 자원이 충분한지 확인
        // 엔딩 이미지 표시
        const endingImage = document.createElement('img');
        endingImage.src = 'https://i.postimg.cc/13Ss6mgx/nomuhyeon.jpg';  // 엔딩 이미지 URL을 넣으세요
        endingImage.alt = '엔딩 이미지';
        endingImage.style.width = '100%';  // 화면에 꽉 차게 크기 조정
        endingImage.style.position = 'absolute';
        endingImage.style.top = '0';
        endingImage.style.left = '0';
        endingImage.style.zIndex = '9999';
        document.body.appendChild(endingImage);
        
        // 엔딩 메시지 표시
        messageDisplay.textContent = "축하해요! 게임을 클리어했어요!";
        messageDisplay.style.color = "gold"; // 색상: 금색
        
        // 게임 종료 효과 (혹은 리셋) - 선택 사항
        collectBtn.disabled = true;
        upgradeBtn.disabled = true;
        generatorBtn.disabled = true;
        endingBtn.disabled = true;
    } else {
        messageDisplay.textContent = `두부가 부족합니다! 엔딩을 위해서는 ${endingCost} 두부가 필요합니다.`;
        messageDisplay.style.color = "red"; // 메시지 색상: 빨간
    }
});

// 업그레이드 전 클릭 시 두부 +1
function addResource() {
    resourceCount++;
    resourceDisplay.textContent = resourceCount;
}

// 업그레이드 후 클릭 시 두부 +clickPower만큼 증가
function addResourceWithUpgrade() {
    resourceCount += clickPower;  // 업그레이드 후 클릭 시 두부 증가량
    resourceDisplay.textContent = resourceCount;
}

// 초당 두부 생성 기능 (봉하마을 활성화 시)
function generateResource() {
    if (generators > 0) {
        resourceCount += resourcePerSecond;  // 봉하마을 개수만큼 초당 두부 증가
        resourceDisplay.textContent = resourceCount;
    }
}

// 초당 두부 생성 시작
setInterval(generateResource, 1000); // 1초마다 두부 생성
