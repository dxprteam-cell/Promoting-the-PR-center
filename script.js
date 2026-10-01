/* ==========================================================================
   01. GLOBAL STATE (전역 상태 및 라우팅 추적 플래그)
   ========================================================================== */
let currentStep = 'home';
let prevStep = 'home';
let activeMenuId = null;
let currentDetailData = null;

// 슬라이더 및 본문 페이징 인덱스
let currentSlideIdx = 0;
let currentSlideArray = [];
let currentDescIdx = 0;
let currentDescArray = [];

/* ==========================================================================
   02. DATA SETS (콘텐츠 마스터 데이터 & 영문 표준화 매핑)
   ========================================================================== */
const finalDetailData = {
    // 1-1) 마스터플랜 ➔ 단계별 건설사업 5종
    "부지 조성": {
        img: './assets/images/construction/land_setup.jpg',
        audio: './assets/audios/masterplan/land_setup.MP3',
        desc: `1990년 6월, 공항 건설을 위해 다양한 후보지가 거론되었고, 항공기의 안전운항과 소음피해, 도심과의 접근성을 고려하여 영종도가 신공항부지로 선정되었습니다. \n신공항부지는 영종도, 용유도, 신불도, 삼목도 네 개의 섬 사이의 바다를 메워 조성되었으며, 총 넓이는 1700만평입니다.`
    },
    "1단계 건설사업": {
        img: './assets/images/construction/phase1.jpg',
        audio: './assets/audios/masterplan/phase1.MP3',
        desc: "1단계 건설사업은 해상매립과 부지조성을 포함한 제1여객터미널과 제1교통센터, 주 관제탑, 첫 번째, 두 번째 활주로가 해당되며, 2001년 3월 29일에 개항했습니다."
    },
    "2단계 건설사업": {
        img: './assets/images/construction/phase2.jpg',
        audio: './assets/audios/masterplan/phase2.MP3',
        desc: "2단계 건설사업은 탑승동과 제1계류장 관제탑, 제3활주로가 해당되며, 2008년 6월 20일에 오픈했습니다."
    },
    "3단계 건설사업": {
        img: './assets/images/construction/phase3.jpg',
        audio: './assets/audios/masterplan/phase3.MP3',
        desc: "3단계 건설사업은 제 2여객터미널의 일부와 제 2교통센터, \n제 2계류장 관제탑과 공항 철도 연결 등이 해당되며, 2018년 1월 18일에 오픈했습니다."
    },
    "4단계 건설사업": {
        img: './assets/images/construction/phase4.jpg',
        audio: './assets/audios/masterplan/phase4.MP3',
        desc: "4단계 건설사업은 제2여객터미널과 교통센터 및 주차 시설 확장, 제4활주로와 고속탈출유도로 건설 및 T2 진입도로와 내부연결도로 확충 등이 해당되며, 2024년 12월 3일 완성되었습니다."
    },

    // 1-2) 친환경 에너지 공항 서브메뉴
    "Green Innovation": {
        video: './assets/videos/eco/green_innovation.mp4',
        audio: './assets/audios/eco/green_innovation.MP3',
        desc: `인천국제공항은 연간 1,700만 톤의 탄소를 배출하고 있으며, 2045년 탄소중립을 목표로 에너지 자립, 그린 모빌리티, 항공 탄소 저감, 생태공항 조성 등 중심으로 친환경공항으로의 전환을 적극적으로 추진하고 있습니다.`
    },
    
    "태양광·지열 에너지": {
        video: './assets/videos/eco/solar_geo.mp4',
        audio: './assets/audios/eco/solar_geo.MP3',
        desc: `태양광 구축을 통해 에너지 자립 RE100 달성에 기여하며, 민간투자를 통해 친환경 전력 생산을 늘려 환경 보호와 전기요금 절감 등을 도모하고 있습니다. 또한 제2여객터미널 지하에 있는 지열 우물을 조성하여 이를 히트펌프 시스템과 연계해 실내 냉/난방에 활용하고 있습니다.\n*RE100: 기업이 사용하는 전력의 100%를 재생에너지 전력으로 조달하겠다는 글로벌 이니셔티브(Renewable Electricity).`
    },
    "미래공항 에너지": {
        video: './assets/videos/eco/future_energy.mp4',
        audio: './assets/audios/eco/future_energy.MP3',
        desc: `연료전지 및 수소발전 등 공항산업에서 신재생에너지의 다각화를 위한 노력을 통해 RE100(2040) 조기 달성에 기여하고자 합니다. \n1.2MW용량의 연료전지를 선제도입하여 피크시간대 전력수요에 대응하기 위해 활용하고 있으며, 2040년 이후 수소항공기 도입에 대비해 수전해로 생산한 수소를 차량과 항공기에 활용하는 미래 전략을 구상하고 있습니다.`
    },
    "그린모빌리티 전환": {
        video: './assets/videos/eco/green_mobility.mp4',
        audio: './assets/audios/eco/green_mobility.mp3',
        desc: `인천국제공항은 친환경 교통수단 확대와 녹지 공간 조성, 기후 변화 대응을 통해 지속 가능한 공항 환경을 만들어 가고 있습니다.\n공항교통의 탈탄소화를 위해 전기차와 수소차 등 친환경 차량을 확대하고 충전 인프라를 구축하고 있으며, 업무용 차량은 100% 친환경 차량으로 전환되었고, 셔틀버스와 지상 조업 차량도 단계적으로 전환하고 있습니다.`
    },
    "생태계와 기후변화 대응": {
        video: './assets/videos/eco/eco_climate.mp4',
        audio: './assets/audios/eco/eco_climate.mp3',
        desc: `생태습지를 조성하고 생태환경을 연결하는 등 체계적인 녹지 관리를 통해 기후변화에 대응하고 생물 다양성을 보전하고 있으며, 기후위기에 선제적으로 대응하기 위해 과학적인 위험 평가와 체계적인 대응 로드맵을 수립하고 있습니다.`
    },
    "친환경 연료 도입": {
        video: './assets/videos/eco/saf_ac_gps.mp4',
        audio: './assets/audios/eco/saf_ac_gps.mp3',
        desc: `SAF는 폐식용유 등에서 만든 친환경 연료로 기존 항공유보다 온실가스를 최대 80% 감축할 수 있습니다. 인천국제공항은 2023년 국내 최초로 SAF 실증을 마치고, 2024년부터 SAF 급유 상용 운항을 시작했습니다.\nAC-GPS는 항공기가 지상에 있을 때 외부 전력을 공급하는 장치입니다. 인천국제공항은 매연(탄소) 및 소음발생이 많은 보조발전엔진(APU) 사용을 대체할 수 있는 항공기 지상전환공급장치(AC-GPS) 265기를 운영 중입니다.`
    },
    "첨단 운항 시스템": {
        video: './assets/videos/eco/asmgcs.mp4',
        audio: './assets/audios/eco/asmgcs.mp3',
        desc: `A-SMGCS는 공항 지상에서 항공기의 위치를 실시간으로 파악하고, 안전한 이동경로를 안내하는 첨단 지상관제 시스템입니다.\n인천국제공항은 A-SMGCS를 통해 항공기의 이동 경로를 효율적으로 관리하고 충돌 위험과 유도로 오진입을 줄여 안정성을 높이고 있습니다.\n또한 불필요한 이동과 대기시간을 줄여 약 6%의 탄소 배출 저감에도 기여하고 있습니다.`
    },

    // 1-3) 스마트 AI 공항
    "공항에서 만나는 스마트 서비스": {
        video: './assets/videos/smart/shuttle.mp4',
        audio: './assets/audios/smart/smart_shuttle.MP3',
        desc: "인천국제공항은 인공지능과 디지털 기술을 활용해 더욱 빠르고 편리한 공항 서비스를 제공하고 있습니다. 또한 생체인식 기반 스마트패스와 카트 로봇, 자율주행 모빌리티 등 디지털 기반 핵심 서비스를 도입해 정보 접근성을 높이고 여객의 편의를 최우선으로 하는 스마트 혁신공항으로 도약하고 있습니다."
    },
    "공항 밖, 손끝에서 시작되는 여정": {
        video: './assets/videos/smart/smartpass.mp4',
        audio: './assets/audios/smart/smart_pass.MP3',
        desc: "인천국제공항 플랫폼을 활용해 비행의 첫걸음을 집에서도 준비할 수 있습니다. 인천공항+는 공항 이용객을 위한 공식 안내 앱으로 다양한 이용 정보를 제공합니다. 또한 안면 인식 기반 출국 심사 앱에 여권과 얼굴 정보를 미리 등록하면 전용 출국장을 통해 더 빠르게 출국할 수 있습니다. 뿐만 아니라 공항 밖 지정 장소에서 수하물을 미리 위탁하거나, 사전 체크인을 이용해 더욱 편리하게 출국할 수 있는 서비스도 제공하고 있습니다."
    },

    // 1-4) LED 미디어 플랫폼
    "Particle": {
        title: 'Aerograph1',
        video: './assets/videos/led/particle.mp4',
        audio: './assets/audios/led/particle.mp3',
        desc: "국내 여행객의 흐름을 대한민국을 상징하는 빨간색과 파란색을 모티브로 하여 연출한 영상입니다. 여객수요가 많을수록 빠르게 움직이며, 코로나 19로 감소했던 시기에는 움직임이 느려지는 모습으로 여객수요의 변화를 시각적으로 보여주고 있습니다."
    },
    "Line": {
        title: 'Aerograph2',
        video: './assets/videos/led/line.mp4',
        audio: './assets/audios/led/line.mp3',
        desc: "인천공항을 이용한 세계 각 지역의 해외 여행객 흐름을 선의 움직임으로 표현했습니다. 비행 중 마주하는 다채로운 하늘의 색상을 모티브로하여 서로 다른 세상의 선들이 덧대어지며 연출되며 지역별 운항수와 승객수를 수치화하여 컬러와 움직임을 함께 접목시켰습니다."
    },
    "Organic": {
        title: 'Aerograph3',
        video: './assets/videos/led/organic.mp4',
        audio: './assets/audios/led/organic.MP3',
        desc: "인천공항의 저탄소·친환경 구현을 위해 실천 중인 에너지 경영의 데이터를 활용한 유기적 그래픽 형태입니다. 글로벌 메가 허브 환경 기반을 의미하는 항공화물 통계를 초록색 계열로 표현하였고, 국내선과 국제선의 데이터를 자연스럽게 변화시키고 확장하는 형태로 연출했습니다."
    },

    // 1-5) 마스터플랜 4종
    "관광·문화": {
        img: './assets/images/masterplan/tourism.jpg',
        audio: './assets/audios/masterplan/tour.mp3',
        desc: `인천공항은 하늘길을 넘어, 새로운 여행과 문화가 만나는 공간으로 나아갑니다.\n복합 리조트와 문화예술 테마파크 등 다양한 관광 자원을 연계해, 체류와 관광을 함께 즐길 수 있는 융합형 관광 허브로 발전해 나갑니다.`
    },
    "항공 지원": {
        img: './assets/images/masterplan/support.jpg',
        audio: './assets/audios/masterplan/support.mp3',
        desc: `인천공항은 안정적인 항공기 운항을 위해 첨단 MRO단지 조성을 추진합니다.\n항공기 정비와 수리, 점검 및 개조를 위한 인프라를 확충해 더욱 안전하고 효율적인 운항 환경을 만들어갑니다.`
    },
    "항공 물류": {
        img: './assets/images/masterplan/logistics.jpg',
        audio: './assets/audios/masterplan/cargo.mp3',
        desc: `인천공항은 글로벌 물류기업과의 협력을 바탕으로 항공 물류의 중심지로 도약합니다.\n동북아 최대 규모의 화물 배후단지와 스마트 물류 시스템을 구축해 더욱 빠르고 효율적인 물류 환경을 만들어갑니다.`
    },
    "친환경 공항": {
        img: [
            './assets/images/masterplan/eco_energy.jpg',
            './assets/images/masterplan/eco_bike.jpg',
            './assets/images/masterplan/eco_station.jpg'
        ],
        audio: './assets/audios/masterplan/eco_master.mp3',
        desc: `인천공항은 탄소 배출을 줄이고 지속 가능한 공항을 만들기 위해 친환경 에너지와 기술을 확대합니다.\n신재생에너지 도입과 저탄소 운영을 통해 미래를 위한 녹색 공항을 만들어갑니다.`
    },

    // 1-6) 하단 퀵메뉴
    "PR zone": {
        title: "홍보관",
        img: './assets/images/bg_pr.jpg',
        audio: '',
        desc: "인천공항의 터미널 구조 및 여객 편의 인프라의 핵심 가이드라인을 알기 쉽게 소개합니다."
    },
    "Bridge": {
        title: ['1단계 건설사업', '2단계 건설사업', '3단계 건설사업', '4단계 건설사업'],
        media: [
            { type: 'video', src: './assets/videos/bridge/bridge_01.MP4' },
            { type: 'video', src: './assets/videos/bridge/bridge_02.MP4' },
            { type: 'video', src: './assets/videos/bridge/bridge_03.MP4' },
            { type: 'video', src: './assets/videos/bridge/bridge_04.MP4' }
        ],
        desc: [
            "이 곳 브릿지에서는 1단계부터 4단계까지의 단계별 건설 사업을 권민호 작가의 드로잉 작품으로 만나보실 수 있습니다. \n첫 번째 작품은 인천공항의 1단계 건설 사업을 담고 있습니다. 중앙에 위치한 거대한 두 개의 크레인이 인천공항의 심볼을 바다 위로 올리고 있는 모습이 굉장히 인상적인데요, 드넓은 바다를 매립하여 건설한 인천공항을 상징적으로 표현한 것입니다. 그리고 우측에 보이는 제비는 예로부터 보라색 제비가 많이 산다고해서 자연도라고도 불렸던 영종도의 특징을 나타낸 것입니다. 또한 인천공항의 초기 명칭인 <수도권신국제공항> 글자도 보실 수 있으며 개항 후 첫 번째로 착륙한 아시아나 항공기도 확인하실 수 있습니다.",
            "다음은 2단계 건설 사업에 대한 작품입니다. 2단계 건설 사업에는 탑승동과 계류장 관제탑, 제3활주로 건설이 해당됩니다. 중앙에는 계류장 관제탑이 위치해 있으며, 상단의 A380과 같은 초대형 항공기를 수용할 수 있도록 4,000미터급의 활주로를 건설하였습니다. 또한 좌측에는 당시 제3활주로 건설을 기념하기 위해 개최된 여성골퍼 장타대회의 모습도 나타나있습니다. 여성 골퍼가 친 골프공이 포물선을 그리고 거기에 숫자가 나란히 적혀있는데요, 이 숫자에는 각각 의미가 담겨있습니다.  먼저 숫자 1번은 세계공항서비스평가 \n1위의 시작을 의미하며, 110번과 122번은 A380기종이 접현 가능한 게이트 번호이고, 515번은 장타대회 최고기록 야드를 뜻합니다. 그리고 숫자 4,000번은 제3활주로의 길이를 뜻하고, 67번은 1터미널에서 탑승동까지의 수하물 처리 시스템 길이인 67km를 의미하며 30번은 탑승동의 게이트 개수를 뜻합니다.",
            "이 작품은 3단계 건설 사업을 담고 있습니다. 제2여객터미널의 모습과 주요 컨셉인 그린, 아트, 스마트를 표현하고 있습니다. 먼저 중앙에는 2터미널 곳곳에서 볼 수 있는 친환경적인 조경이 위치해있고 원 안에는 터미널 내에 전시되어 있는 예술작품들이 담겨있습니다. 또한 하단에는 인공지능 로봇인 '에어스타'와 2터미널에 처음 도입된 원형 보안검색대를 함께 확인하실 수 있습니다.",
            "마지막 작품은 제2여객터미널의 확장과 제4활주로 신설이 포함된 4단계 건설 사업에 대한 내용입니다. 인천공항의 주변 지역을 아우르는 융복합 문화산업 벨트 구축을 위한 허브공항으로서의 목표가 담겨있습니다. 먼저 문화 예술 산업을 중심으로 한 문화·네트워크 허브로서 좌·우측에 테마파크와 예술 조각상 등이 나타나있습니다. 또한 좌측 하단에는 디지털 혁신을 통한 미래공항의 모습으로 터널형 보안 검색기와 자율주행차량을 확인하실 수 있습니다."
        ]
    }
};

// 2) 세계명소 18종 마스터 데이터
const LANDMARK_ITEMS = [
    { id: 1, country: "대한민국", code: "kr", name: "경복궁", img: "./assets/images/landmarks/1_경복궁.jpg", desc: "1395년 태조 이성계에 의해 창건된 조선 왕조의 법궁으로, 근정전과 경회루가 아름다운 대한민국의 대표 궁궐입니다." },
    { id: 2, country: "대한민국", code: "kr", name: "성산일출봉", img: "./assets/images/landmarks/2_성산일출봉.jpg", desc: "제주도 동쪽에 우뚝 솟은 해안 화산체로, 유네스코 세계자연유산으로 등재된 대한민국 최고의 일출 명소입니다." },
    { id: 3, country: "중국", code: "cn", name: "만리장성", img: "./assets/images/landmarks/3_만리장성.jpg", desc: "중국의 북방 민족 침입을 막기 위해 수천 년에 걸쳐 축조된 총연장 2만 km가 넘는 인류 최대 규모의 건축 유적입니다." },
    { id: 4, country: "일본", code: "jp", name: "오사카성", img: "./assets/images/landmarks/4_오사카성.jpg", desc: "일본 오사카의 대표 역사 유적으로, 봄철 천수각 주변에 만개하는 벚꽃 풍경과 웅장한 해자가 장관을 이룹니다." },
    { id: 5, country: "인도", code: "in", name: "타지마할", img: "./assets/images/landmarks/5_타지마할.jpg", desc: "인도 아그라에 위치하며, 무굴 제국 황제 샤 자한이 왕비를 추모하기 위해 순백의 대리석으로 지은 영묘 건축의 걸작입니다." },
    { id: 6, country: "캄보디아", code: "kh", name: "앙코르와트", img: "./assets/images/landmarks/6_앙코르와트.jpg", desc: "캄보디아 크메르 제국 전성기에 건립된 대사원으로, 인류 역사상 가장 거대하고 신비로운 석조 종교 건축물입니다." },
    { id: 7, country: "그리스", code: "gr", name: "산토리니", img: "./assets/images/landmarks/7_산토리니.jpg", desc: "그리스 에게해의 대표 화산섬으로, 절벽 위 새하얀 골목과 파란 돔 지붕, 황홀한 에게해의 일몰로 사랑받는 휴양지입니다." },
    { id: 8, country: "프랑스", code: "fr", name: "에펠탑", img: "./assets/images/landmarks/8_에펠탑.jpg", desc: "1889년 파리 만국박람회를 기념해 세워진 프랑스 파리의 영원한 상징이자 철골 예술의 정수로 불리는 랜드마크입니다." },
    { id: 9, country: "이탈리아", code: "it", name: "콜로세움", img: "./assets/images/landmarks/9_콜로세움.jpg", desc: "고대 로마 검투사들의 박진감 넘치는 결투가 펼쳐졌던 5만 명 수용 규모의 웅장한 원형 경기장 유적입니다." },
    { id: 10, country: "영국", code: "gb", name: "타워브릿지", img: "./assets/images/landmarks/10_타워브릿지.jpg", desc: "영국 런던 템스강을 가로지르는 상징적인 도개교로, 대형 선박이 지날 때 다리 중앙이 양쪽으로 열리는 구조입니다." },
    { id: 11, country: "미국", code: "us", name: "금문교", img: "./assets/images/landmarks/11_금문교.jpg", desc: "미국 샌프란시스코의 랜드마크로, 짙은 바다 안개 속에서도 잘 보이도록 특유의 인터내셔널 오렌지 색상으로 칠해졌습니다." },
    { id: 12, country: "캐나다", code: "ca", name: "모레인호수", img: "./assets/images/landmarks/12_모레인호수.jpg", desc: "캐나다 밴프 국립공원에 위치하며, 빙하가 녹아 흘러내린 암분 덕분에 신비로운 에메랄드빛 수면을 자랑합니다." },
    { id: 13, country: "페루", code: "pe", name: "마추픽추", img: "./assets/images/landmarks/13_마추픽추.jpg", desc: "페루 안데스 산맥 해발 2,430m에 위치한 잉카 제국의 공중도시로, 신비로운 석조 기술을 간직한 고대 유적입니다." },
    { id: 14, country: "브라질", code: "br", name: "예수상", img: "./assets/images/landmarks/14_예수상.jpg", desc: "브라질 리우데자네이루 코르코바두산 정상에서 두 팔을 벌려 도시와 바다를 품고 있는 38m 높이의 거대한 조각상입니다." },
    { id: 15, country: "호주", code: "au", name: "오페라하우스", img: "./assets/images/landmarks/15_오페라하우스.jpg", desc: "호주 시드니 항구에 위치하며, 바다 위에 떠 있는 조개껍데기와 돛단배를 형상화한 현대 건축의 최고 걸작입니다." },
    { id: 16, country: "뉴질랜드", code: "nz", name: "베이오브아일랜즈", img: "./assets/images/landmarks/16_베이오브아일랜즈.jpg", desc: "뉴질랜드 북섬에 위치한 140여 개의 아열대 섬들로 이루어진 청정 해양 휴양지이자 해양 레포츠의 천국입니다." },
    { id: 17, country: "이집트", code: "eg", name: "피라미드", img: "./assets/images/landmarks/17_피라미드.jpg", desc: "이집트 기자 고원에 우뚝 서 있는 고대 파라오의 거대한 무덤으로, 세계 7대 불가사의 중 가장 대표적인 건축물입니다." },
    { id: 18, country: "짐바브웨", code: "zw", name: "빅토리아폭포", img: "./assets/images/landmarks/18_빅토리아폭포.jpg", desc: "아프리카 잠비아와 짐바브웨 국경에 위치하며, '천둥 치는 연기'라는 원주민 이름처럼 장엄한 물보라를 뿜어내는 세계 3대 폭포입니다." }
];

// 3) 이벤트 퀴즈 전용 데이터셋
const RAW_DATA = [
    { answer: "금문교", dummy: ["샌", "프", "란", "다", "리"], tmi: "미국 샌프란시스코의 상징으로, 짙은 안개 속에서도 잘 보이도록 오렌지 레드 색상으로 칠해졌습니다.", img: "./assets/images/landmark/landmark_01.jpg", pos: "bottom center" },
    { answer: "마추픽추", dummy: ["잉", "카", "고", "대"], tmi: "페루 안데스 산맥 해발 2,430m에 위치한 잉카 제국의 공중도시로, '늙은 봉우리'라는 뜻을 가집니다.", img: "./assets/images/landmark/landmark_02.jpg", pos: "bottom center" },
    { answer: "만리장성", dummy: ["자", "금", "벽", "대"], tmi: "중국의 북방 민족 침입을 막기 위해 수천 년에 걸쳐 축조된 총연장 2만 km가 넘는 인류 최대 건축물입니다.", img: "./assets/images/landmark/landmark_03.jpg", pos: "bottom center" },
    { answer: "모레인호수", dummy: ["로", "키", "빙", "하"], tmi: "캐나다 밴프 국립공원에 위치하며, 빙하가 녹아 흘러내린 암분 덕분에 신비로운 에메랄드빛을 띱니다.", img: "./assets/images/landmark/landmark_04.jpg", pos: "top center", view: "moraine" },
    { answer: "베이오브아일랜즈", dummy: ["뉴"], tmi: "뉴질랜드 북섬에 위치한 140여 개의 아열대 섬들로 이루어진 아름다운 해양 휴양 천국입니다.", img: "./assets/images/landmark/landmark_05.jpg", pos: "bottom center" },
    { answer: "예수상", dummy: ["리", "우", "언", "덕", "돌"], tmi: "브라질 리우데자네이루 코르코바두산 정상에서 두 팔을 벌려 도시를 품고 있는 38m의 거대한 조각상입니다.", img: "./assets/images/landmark/landmark_06.jpg", pos: "bottom center" },
    { answer: "빅토리아폭포", dummy: ["잠", "베"], tmi: "아프리카 잠비아와 짐바브웨 국경에 위치하며, 현지어로는 '천둥 치는 연기'라는 뜻을 지닙니다.", img: "./assets/images/landmark/landmark_07.jpg", pos: "bottom center" },
    { answer: "산토리니", dummy: ["이", "아", "마", "을"], tmi: "그리스 에게해의 대표 화산섬으로, 새하얀 건물과 파란 돔 지붕, 황홀한 일몰로 사랑받는 명소입니다.", img: "./assets/images/landmark/landmark_08.jpg", pos: "bottom center" },
    { answer: "성산일출봉", dummy: ["제", "주", "화"], tmi: "대한민국 제주도 동쪽에 우뚝 솟은 해안 화산체로, 유네스코 세계자연유산으로 등재된 일출 명소입니다.", img: "./assets/images/landmark/landmark_09.jpg", pos: "bottom center" },
    { answer: "앙코르와트", dummy: ["크", "메", "사"], tmi: "캄보디아 크메르 제국 전성기에 건립된 대사원으로, 인류 역사상 가장 거대한 종교 건축물 중 하나입니다.", img: "./assets/images/landmark/landmark_10.jpg", pos: "bottom center" },
    { answer: "에펠탑", dummy: ["파", "리", "센", "루", "철"], tmi: "1889년 파리 만국박람회를 기념해 세워진 프랑스 파리의 영원한 상징이자 철골 예술품입니다.", img: "./assets/images/landmark/landmark_11.jpg", pos: "top center", view: "tower" },
    { answer: "오사카성", dummy: ["도", "요", "토", "미"], tmi: "일본 오사카의 대표 역사 유적으로, 봄철 천수각 주변에 만개하는 벚꽃 뷰가 장관을 이룹니다.", img: "./assets/images/landmark/landmark_12.jpg", pos: "top center", view: "osaka" },
    { answer: "오페라하우스", dummy: ["시", "드"], tmi: "호주 시드니 항구에 위치하며, 바다 위에 떠 있는 조개껍데기 혹은 돛단배를 형상화한 건축 걸작입니다.", img: "./assets/images/landmark/landmark_13.jpg", pos: "bottom center" },
    { answer: "콜로세움", dummy: ["로", "마", "검", "투"], tmi: "이탈리아 로마에 남겨진 고대 거대 원형 경기장으로, 5만 명 이상의 관중을 수용할 수 있었습니다.", img: "./assets/images/landmark/landmark_14.jpg", pos: "bottom center" },
    { answer: "타워브릿지", dummy: ["런", "던", "템"], tmi: "영국 런던 템스강을 가로지르는 도개교로, 대형 배가 지나갈 때 다리 가운데가 열리도록 설계되었습니다.", img: "./assets/images/landmark/landmark_15.jpg", pos: "bottom center" },
    { answer: "타지마할", dummy: ["인", "도", "아", "그"], tmi: "인도 아그라에 위치하며, 황제 샤 자한이 사랑하는 아내를 추모하기 위해 지은 순백의 대리석 묘당입니다.", img: "./assets/images/landmark/landmark_16.jpg", pos: "top center", view: "taj" },
    { answer: "피라미드", dummy: ["이", "집", "트", "스"], tmi: "이집트 기자 고원에 세워진 고대 파라오의 거대한 무덤으로, 세계 고대 7대 불가사의 중 하나입니다.", img: "./assets/images/landmark/landmark_17.jpg", pos: "bottom center" },
    { answer: "경복궁", dummy: ["조", "선", "한", "양", "터"], tmi: "1395년 태조 이성계에 의해 창건된 조선 왕조의 법궁(제1궁궐)으로, 근정전과 경회루가 유명합니다.", img: "./assets/images/landmark/landmark_18.jpg", pos: "bottom center" }
];

const FALLBACK_CHARS = ["동", "서", "남", "북", "산", "강", "빛", "별", "숲", "바", "람", "돌", "길", "문", "하", "늘"];
const CHOSUNG_LIST = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

/* ==========================================================================
   03. ROUTING & SCREEN CONTROLLER
   ========================================================================== */
function hideAllSubViews() {
    closeLandmarkModal();
    closeMediaZoomModal();

    const ids = [
        'masterplan-sub-menu',
        'construction-sub-menu',
        'eco-sub-menu',
        'eco-inno-sub-menu',
        'eco-build-sub-menu',
        'eco-carbon-sub-menu',
        'smart-sub-menu',
        'led-sub-menu',
        'general-depth-body',
        'landmark-gallery-view',
        'event-game-view'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}

function resetDepthThemes() {
    const depthScreen = document.getElementById('depth-screen');
    if (!depthScreen) return;
    depthScreen.classList.remove(
        'theme-masterplan', 'theme-eco', 'theme-smart',
        'theme-led', 'theme-landmark-gallery', 'theme-pr',
        'theme-bridge', 'theme-event'
    );
}

function updateBackButtonText() {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.innerHTML = `<i class="fa-solid fa-chevron-left"></i> 이전화면으로 돌아가기`;
    }
}

function openDepth(menuId) {
    try {
        finishCurrentViewing();
    } catch(e) {}

    document.getElementById('main-screen').style.display = 'none';
    const depthScreen = document.getElementById('depth-screen');
    
    depthScreen.style.display = 'flex';
    hideAllSubViews();
    resetAudioPlayer();
    resetDepthThemes();
    updateBackButtonText();

    const depthHeader = document.querySelector('.depth-header');
    if (depthHeader) depthHeader.style.display = 'block';

    if (menuId === 'masterplan') {
        currentStep = 'masterplan';
        prevStep = 'home';
        depthScreen.classList.add('theme-masterplan');
        document.getElementById('masterplan-sub-menu').style.display = 'flex';
    } 
    else if (menuId === 'eco') {
        currentStep = 'eco-main';
        prevStep = 'home';
        depthScreen.classList.add('theme-eco');
        document.getElementById('eco-sub-menu').style.display = 'flex';
    } 
    else if (menuId === 'smart') {
        currentStep = 'smart-main';
        prevStep = 'home';
        depthScreen.classList.add('theme-smart');
        document.getElementById('smart-sub-menu').style.display = 'flex';
    } 
    else if (menuId === 'led') {
        currentStep = 'led-main';
        prevStep = 'home';
        depthScreen.classList.add('theme-led');
        document.getElementById('led-sub-menu').style.display = 'flex';
    } 
    else if (menuId === 'landmark-gallery' || menuId === 'gallery') {
        currentStep = 'landmark-gallery';
        prevStep = 'home';
        currentViewingContent = "세계명소";
        viewStartTime = Date.now();
        if (depthScreen) depthScreen.classList.add('theme-landmark-gallery');
        
        resetAudioPlayer();
        renderLandmarkGallery();

        const galleryView = document.getElementById('landmark-gallery-view');
        if (galleryView) galleryView.style.display = 'flex';

        if (depthScreen) depthScreen.classList.add('active');
        return;
    }
    else if (menuId === 'event') {
        prevStep = 'home';
        currentStep = 'event-game';
        currentViewingContent = "이벤트(랜드마크퀴즈)";
        viewStartTime = Date.now();

        depthScreen.classList.add('theme-event');
        if (depthHeader) depthHeader.style.display = 'none';

        const gameView = document.getElementById('event-game-view');
        if (gameView) {
            gameView.style.display = 'flex';
            startLandmarkQuizGame();
        }
        if (depthScreen) depthScreen.classList.add('active');
        return;
    }
    else {
        // 하단 바 퀵메뉴 (PR zone, Bridge)
        prevStep = 'home';
        currentStep = 'detail';
        activeMenuId = menuId;

        if (menuId === 'PR zone' || menuId === 'info') {
            depthScreen.classList.add('theme-pr');
        } else if (menuId === 'Bridge' || menuId === 'video') {
            depthScreen.classList.add('theme-bridge');
        }

        const data = finalDetailData[menuId];
        if (data) {
            currentDetailData = data;
            currentViewingContent = (menuId === 'PR zone') ? "홍보관" : (menuId === 'Bridge') ? "브릿지" : (data.title || menuId);
            viewStartTime = Date.now();

            const depthBody = document.getElementById('general-depth-body');
            if (depthBody) {
                depthBody.classList.add('no-audio');
            }
            const audioZone = document.querySelector('.audio-player-zone');
            if (audioZone) audioZone.style.display = 'none';

            setupMediaView(data);
            setupDescView(data.desc);

            const targetTitleEl = document.getElementById('target-title');
            if (targetTitleEl) {
                targetTitleEl.innerText = Array.isArray(data.title) ? data.title[0] : (data.title || '');
            }

            document.getElementById('general-depth-body').style.display = 'flex';
        }
    }

    depthScreen.classList.add('active');
}

function openConstructionMenu() {
    prevStep = 'masterplan';
    currentStep = 'construction';
    resetAudioPlayer();
    hideAllSubViews();
    document.getElementById('construction-sub-menu').style.display = 'flex';
    updateBackButtonText();
}

function openEcoInnovationMenu() {
    prevStep = 'eco-main';
    currentStep = 'eco-inno';
    resetAudioPlayer();
    hideAllSubViews();
    document.getElementById('eco-inno-sub-menu').style.display = 'flex';
    updateBackButtonText();
}

function openEcoBuildMenu() {
    prevStep = 'eco-main';
    currentStep = 'eco-build';
    resetAudioPlayer();
    hideAllSubViews();
    document.getElementById('eco-build-sub-menu').style.display = 'flex';
    updateBackButtonText();
}

function openEcoCarbonMenu() {
    prevStep = 'eco-main';
    currentStep = 'eco-carbon';
    resetAudioPlayer();
    hideAllSubViews();
    document.getElementById('eco-carbon-sub-menu').style.display = 'flex';
    updateBackButtonText();
}

function openFinalDetail(detailName) {
    try {
        finishCurrentViewing();
    } catch(e) {}

    currentViewingContent = detailName;
    viewStartTime = Date.now();

    if (currentStep !== 'detail') {
        prevStep = currentStep;
    }
    currentStep = 'detail';
    
    resetAudioPlayer();
    hideAllSubViews();

    // ★ 오디오 숨김 해제 및 오디오 플레이어 UI 보장
    const depthBody = document.getElementById('general-depth-body');
    if (depthBody) {
        depthBody.classList.remove('no-audio');
    }
    const audioZone = document.querySelector('.audio-player-zone');
    if (audioZone) {
        audioZone.style.display = 'block';
    }

    const data = finalDetailData[detailName];
    if (data) {
        currentDetailData = data;
        activeMenuId = detailName;
        setupMediaView(data);
        setupDescView(data.desc);

        // ★ 오디오 소스 설정 및 재로딩
        const firstAudio = Array.isArray(data.audio) ? data.audio[0] : (data.audio || '');
        const audioEl = document.getElementById('target-audio');
        if (audioEl) {
            audioEl.src = encodeURI(firstAudio);
            if (firstAudio) {
                audioEl.load();
            }
        }

        const pageTitle = Array.isArray(data.title) ? data.title[0] : (data.title || detailName);
        document.getElementById('target-title').innerText = pageTitle;
        document.getElementById('general-depth-body').style.display = 'flex';
    }
    updateBackButtonText();
}

function handleBack() {
    // 1순위: 확대 모달이 열려 있다면 뷰어만 닫고 유지 (음성 계속 재생)
    const mediaZoomModal = document.getElementById('media-zoom-modal');
    if (mediaZoomModal && mediaZoomModal.style.display === 'flex') {
        closeMediaZoomModal();
        return;
    }

    // 2순위: 세계명소 모달 닫기
    const modal = document.getElementById('landmark-modal');
    if (modal && modal.style.display === 'flex') {
        closeLandmarkModal();
        return;
    }

    if (typeof quizTimerId !== 'undefined' && quizTimerId) {
        clearInterval(quizTimerId);
        quizTimerId = null;
    }
    isProcessing = true;

    const depthHeader = document.querySelector('.depth-header');
    if (depthHeader) depthHeader.style.display = 'block';

    try { finishCurrentViewing(); } catch (e) {}
    try { resetAudioPlayer(); } catch (e) {}

    const targetVideoEl = document.getElementById('target-video');
    if (targetVideoEl) {
        targetVideoEl.pause();
        targetVideoEl.src = '';
        targetVideoEl.style.display = 'none';
    }

    hideAllSubViews();
    updateBackButtonText();

    const depthScreen = document.getElementById('depth-screen');

    if (currentStep === 'event-game' || currentStep === 'landmark-gallery' || currentStep === 'gallery') {
        closeToHome();
        return;
    }

    if (currentStep === 'detail') {
        if (prevStep === 'construction') {
            currentStep = 'construction';
            prevStep = 'masterplan';
            if (depthScreen) depthScreen.classList.add('theme-masterplan');
            document.getElementById('construction-sub-menu').style.display = 'flex';
            return;
        } 
        if (prevStep === 'eco-inno') {
            currentStep = 'eco-inno';
            prevStep = 'eco-main';
            if (depthScreen) depthScreen.classList.add('theme-eco');
            document.getElementById('eco-inno-sub-menu').style.display = 'flex';
            return;
        } 
        if (prevStep === 'eco-build') {
            currentStep = 'eco-build';
            prevStep = 'eco-main';
            if (depthScreen) depthScreen.classList.add('theme-eco');
            document.getElementById('eco-build-sub-menu').style.display = 'flex';
            return;
        } 
        if (prevStep === 'eco-carbon') {
            currentStep = 'eco-carbon';
            prevStep = 'eco-main';
            if (depthScreen) depthScreen.classList.add('theme-eco');
            document.getElementById('eco-carbon-sub-menu').style.display = 'flex';
            return;
        } 
        if (prevStep === 'masterplan') {
            currentStep = 'masterplan';
            prevStep = 'home';
            if (depthScreen) depthScreen.classList.add('theme-masterplan');
            document.getElementById('masterplan-sub-menu').style.display = 'flex';
            return;
        } 
        if (prevStep === 'eco-main') {
            currentStep = 'eco-main';
            prevStep = 'home';
            if (depthScreen) depthScreen.classList.add('theme-eco');
            document.getElementById('eco-sub-menu').style.display = 'flex';
            return;
        } 
        if (prevStep === 'smart-main') {
            currentStep = 'smart-main';
            prevStep = 'home';
            if (depthScreen) depthScreen.classList.add('theme-smart');
            document.getElementById('smart-sub-menu').style.display = 'flex';
            return;
        } 
        if (prevStep === 'led-main') {
            currentStep = 'led-main';
            prevStep = 'home';
            if (depthScreen) depthScreen.classList.add('theme-led');
            document.getElementById('led-sub-menu').style.display = 'flex';
            return;
        }

        closeToHome();
        return;
    }

    if (currentStep === 'construction') {
        currentStep = 'masterplan';
        prevStep = 'home';
        document.getElementById('masterplan-sub-menu').style.display = 'flex';
        return;
    } 
    if (currentStep === 'eco-inno' || currentStep === 'eco-build' || currentStep === 'eco-carbon') {
        currentStep = 'eco-main';
        prevStep = 'home';
        if (depthScreen) depthScreen.classList.add('theme-eco');
        document.getElementById('eco-sub-menu').style.display = 'flex';
        return;
    }

    closeToHome();
}

function closeToHome() {
    currentStep = 'home';
    prevStep = 'home';
    resetDepthThemes();

    const depthScreen = document.getElementById('depth-screen');
    if (depthScreen) {
        depthScreen.classList.remove('active');
        depthScreen.style.display = 'none';
    }

    const mainScreen = document.getElementById('main-screen');
    if (mainScreen) {
        mainScreen.style.display = 'flex';
    }
}

/* ==========================================================================
   04. MEDIA & AUDIO CONTROLLER (비디오 컨트롤 바 복구 및 확대 연동)
   ========================================================================== */
function setupMediaView(data) {
    const targetImgEl = document.getElementById('target-img');
    const targetVideoEl = document.getElementById('target-video');
    const sliderContainerEl = document.getElementById('slider-container');

    if (data.video) {
        if (targetImgEl) targetImgEl.style.display = 'none';
        if (sliderContainerEl) sliderContainerEl.style.display = 'none';
        if (targetVideoEl) {
            targetVideoEl.style.display = 'block';
            targetVideoEl.controls = true; // ★ 일시정지/재생 컨트롤 바 복구
            targetVideoEl.muted = true;    // ★ 음성안내 충돌 방지 및 모바일 자동재생 보장
            targetVideoEl.setAttribute('muted', '');
            targetVideoEl.setAttribute('playsinline', '');
            targetVideoEl.setAttribute('webkit-playsinline', '');
            targetVideoEl.src = encodeURI(data.video);
            targetVideoEl.load();
            targetVideoEl.play().catch(e => console.log("비디오 재생 권한 대기:", e));

            // 클릭 시 라이트박스 확대 (단, 컨트롤 바 자체 터치는 제외)
            targetVideoEl.onclick = function(e) {
                // 상단 여백 클릭 시 확대
                if (e.offsetY < (targetVideoEl.clientHeight - 48)) {
                    openMediaZoomModal('video', this.currentSrc || this.src);
                }
            };
        }
    } 
    else if (Array.isArray(data.media)) {
        if (targetVideoEl) targetVideoEl.style.display = 'none';
        if (targetImgEl) targetImgEl.style.display = 'none';
        if (sliderContainerEl) sliderContainerEl.style.display = 'block';
        
        currentSlideArray = data.media;
        currentSlideIdx = 0;
        updateMixedSlideView();
    } 
    else if (Array.isArray(data.img)) {
        if (targetVideoEl) targetVideoEl.style.display = 'none';
        if (sliderContainerEl) sliderContainerEl.style.display = 'block';
        if (targetImgEl) targetImgEl.style.display = 'none';
        
        currentSlideArray = data.img.map(src => ({ type: 'image', src: src }));
        currentSlideIdx = 0;
        updateMixedSlideView();
    } 
    else {
        if (targetVideoEl) targetVideoEl.style.display = 'none';
        if (sliderContainerEl) sliderContainerEl.style.display = 'none';
        if (targetImgEl) {
            targetImgEl.style.display = 'block';
            targetImgEl.src = encodeURI(data.img || '');
            targetImgEl.onclick = function() {
                if (this.src) openMediaZoomModal('image', this.src);
            };
        }
    }
}

function updateMixedSlideView() {
    if (!currentSlideArray || currentSlideArray.length === 0) return;
    
    const currentItem = currentSlideArray[currentSlideIdx];
    const sliderImg = document.getElementById('slider-img');
    const sliderVideo = document.getElementById('slider-video');

    if (currentItem.type === 'video') {
        if (sliderImg) sliderImg.style.display = 'none';
        if (sliderVideo) {
            sliderVideo.style.display = 'block';
            sliderVideo.controls = true; // ★ 컨트롤 바 활성화
            sliderVideo.setAttribute('playsinline', '');
            sliderVideo.setAttribute('webkit-playsinline', '');

            const targetSrc = encodeURI(currentItem.src);
            if (sliderVideo.src !== targetSrc) {
                sliderVideo.src = targetSrc;
                sliderVideo.currentTime = 0;
                sliderVideo.load();
            }

            if (activeMenuId === 'Bridge' || currentItem.src.includes('bridge')) {
                sliderVideo.muted = false;
                sliderVideo.removeAttribute('muted');
                sliderVideo.pause();
            } else {
                sliderVideo.muted = true;
                sliderVideo.setAttribute('muted', '');
                sliderVideo.play().catch(e => console.warn("슬라이더 자동재생 대기:", e));
            }

            sliderVideo.onclick = function(e) {
                if (e.offsetY < (sliderVideo.clientHeight - 48)) {
                    openMediaZoomModal('video', this.currentSrc || this.src);
                }
            };
        }
    } else {
        if (sliderVideo) {
            sliderVideo.pause();
            sliderVideo.currentTime = 0;
            sliderVideo.style.display = 'none';
        }
        if (sliderImg) {
            sliderImg.style.display = 'block';
            sliderImg.src = encodeURI(currentItem.src);
            sliderImg.onclick = function() {
                if (this.src) openMediaZoomModal('image', this.src);
            };
        }
    }

    const pageEl = document.getElementById('slider-page');
    if (pageEl) pageEl.innerText = `${currentSlideIdx + 1} / ${currentSlideArray.length}`;
}

function moveSlide(direction) {
    if (!currentSlideArray || currentSlideArray.length === 0) return;

    currentSlideIdx += direction;
    if (currentSlideIdx < 0) {
        currentSlideIdx = currentSlideArray.length - 1;
    } else if (currentSlideIdx >= currentSlideArray.length) {
        currentSlideIdx = 0;
    }
    updateMixedSlideView();

    if (currentDescArray && currentDescArray.length > 0) {
        currentDescIdx = currentSlideIdx % currentDescArray.length;
        updateDescView();
    }
}

function setupDescView(descData) {
    const descControls = document.getElementById('desc-controls');
    if (Array.isArray(descData) && descData.length > 1) {
        currentDescArray = descData;
        currentDescIdx = 0;
        if (activeMenuId === 'Bridge') {
            if (descControls) descControls.style.display = 'none';
        } else {
            if (descControls) descControls.style.display = 'flex';
        }
        updateDescView();
    } else {
        currentDescArray = [];
        if (descControls) descControls.style.display = 'none';
        const descElem = document.getElementById('target-desc');
        if (descElem) {
            descElem.innerText = Array.isArray(descData) ? descData[0] : (descData || '');
        }
    }
}

function updateDescView() {
    const pageIndicator = document.getElementById('desc-page');
    if (pageIndicator && currentDescArray.length > 0) {
        pageIndicator.innerText = `${currentDescIdx + 1} / ${currentDescArray.length}`;
    }

    const descElem = document.getElementById('target-desc');
if (descElem && currentDescArray[currentDescIdx]) {
    descElem.innerText = currentDescArray[currentDescIdx];
    descElem.classList.remove('font-compact');
}

    const titleElem = document.getElementById('target-title');
    if (titleElem && currentDetailData) {
        if (Array.isArray(currentDetailData.title)) {
            titleElem.innerText = currentDetailData.title[currentDescIdx] || currentDetailData.title[0];
        } else if (currentDetailData.title) {
            titleElem.innerText = currentDetailData.title;
        }
    }

    const audioElem = document.getElementById('target-audio');
    if (audioElem && currentDetailData && currentDetailData.audio) {
        resetAudioPlayer();
        const targetAudioSrc = Array.isArray(currentDetailData.audio) ? currentDetailData.audio[currentDescIdx] : currentDetailData.audio;
        audioElem.src = encodeURI(targetAudioSrc || '');
        if (audioElem.src) audioElem.load();
    }
}

function moveDescSlide(direction) {
    currentDescIdx += direction;
    if (currentDescIdx < 0) {
        currentDescIdx = currentDescArray.length - 1;
    } else if (currentDescIdx >= currentDescArray.length) {
        currentDescIdx = 0;
    }
    updateDescView();
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function toggleAudio() {
    const audio = document.getElementById('target-audio');
    const icon = document.getElementById('audio-icon');
    const text = document.getElementById('audio-btn-text');
    const btn = document.getElementById('audio-toggle-btn');

    if (!audio) return;
    if (!audio.src || audio.src.endsWith('/') || audio.src.endsWith(window.location.href)) {
        alert("해당 항목의 음성 안내는 준비 중입니다.");
        return;
    }

    if (audio.paused) {
        if (audio.ended) audio.currentTime = 0;
        audio.play().then(() => {
            if (icon) icon.className = 'fa-solid fa-pause';
            if (text) text.innerText = '일시 정지';
            if (btn) btn.classList.add('playing');
        }).catch(err => console.warn("오디오 재생 권한 대기:", err));
    } else {
        audio.pause();
        if (icon) icon.className = 'fa-solid fa-play';
        if (text) text.innerText = '음성 안내';
        if (btn) btn.classList.remove('playing');
    }
}

function resetAudioPlayer() {
    const audio = document.getElementById('target-audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    const icon = document.getElementById('audio-icon');
    if (icon) icon.className = 'fa-solid fa-play';
    const text = document.getElementById('audio-btn-text');
    if (text) text.innerText = '음성 안내';
    const btn = document.getElementById('audio-toggle-btn');
    if (btn) btn.classList.remove('playing');
    const currentTimeEl = document.getElementById('audio-current-time');
    if (currentTimeEl) currentTimeEl.innerText = '00:00';

    const video = document.getElementById('target-video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    const sliderVideo = document.getElementById('slider-video');
    if (sliderVideo) {
        sliderVideo.pause();
        sliderVideo.currentTime = 0;
    }
}

/* ==========================================================================
   05. MEDIA ZOOM VIEWER (확대 뷰어 모달 - 음성 재생 유지)
   ========================================================================== */
function openMediaZoomModal(type, src) {
    if (!src) return;

    const modal = document.getElementById('media-zoom-modal');
    const zoomImg = document.getElementById('zoom-modal-img');
    const zoomVideo = document.getElementById('zoom-modal-video');
    if (!modal) return;

    if (type === 'image') {
        if (zoomVideo) {
            zoomVideo.pause();
            zoomVideo.style.display = 'none';
        }
        if (zoomImg) {
            zoomImg.src = src;
            zoomImg.style.display = 'block';
        }
    } else if (type === 'video') {
        if (zoomImg) zoomImg.style.display = 'none';
        if (zoomVideo) {
            zoomVideo.src = src;
            zoomVideo.controls = true;
            zoomVideo.muted = true; // 음성 안내와 사운드 중첩 방지
            zoomVideo.style.display = 'block';
            zoomVideo.play().catch(() => {});
        }
    }

    modal.style.display = 'flex';
}

function closeMediaZoomModal() {
    const modal = document.getElementById('media-zoom-modal');
    const zoomVideo = document.getElementById('zoom-modal-video');
    
    if (zoomVideo) {
        zoomVideo.pause();
        zoomVideo.src = '';
    }
    if (modal) {
        modal.style.display = 'none';
    }
    // ※ target-audio(음성안내)는 건드리지 않고 그대로 재생 유지
}

/* ==========================================================================
   06. FEATURE MODULES (세계명소 갤러리)
   ========================================================================== */
function playDingDongSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(783.99, ctx.currentTime);
        gain1.gain.setValueAtTime(0.22, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 0.35);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(523.25, ctx.currentTime + 0.15);
        gain2.gain.setValueAtTime(0.28, ctx.currentTime + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.15);
        osc2.stop(ctx.currentTime + 0.65);
    } catch (e) {}
}

function renderLandmarkGallery() {
    const grid = document.getElementById('landmark-grid');
    if (!grid) return;
    grid.innerHTML = '';

    LANDMARK_ITEMS.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'landmark-portal-card';
        card.onclick = () => openLandmarkDetail(index);

        card.innerHTML = `
            <div class="landmark-thumb-box">
                <img src="${encodeURI(item.img)}" alt="${item.name}" onerror="this.src='./assets/images/default.jpg'">
            </div>
            <span class="landmark-label">
                <img src="https://flagcdn.com/20x15/${item.code}.png" class="flag-icon" alt="${item.country}">
                ${item.name}
            </span>
        `;
        grid.appendChild(card);
    });
}

function openLandmarkDetail(index) {
    const item = LANDMARK_ITEMS[index];
    if (!item) return;

    playDingDongSound();

    const imgEl = document.getElementById('modal-landmark-img');
    const titleEl = document.getElementById('modal-landmark-title');
    const descEl = document.getElementById('modal-landmark-desc');

    if (imgEl) imgEl.src = encodeURI(item.img);
    if (titleEl) {
        titleEl.innerHTML = `
            <img src="https://flagcdn.com/24x18/${item.code}.png" class="flag-icon modal-flag" alt="${item.country}">
            ${item.country} · ${item.name}
        `;
    }
    if (descEl) descEl.innerText = item.desc;

    const modal = document.getElementById('landmark-modal');
    if (modal) modal.style.display = 'flex';
}

function closeLandmarkModal() {
    const modal = document.getElementById('landmark-modal');
    if (modal) modal.style.display = 'none';
}

/* ==========================================================================
   07. FEATURE MODULES (세계 랜드마크 탐험 퀴즈 엔진)
   ========================================================================== */
let quizQueue = [];
const TARGET_SOLVED = 5;
let solvedCount = 0;
let wrongAttempts = 0;
let quizScore = 0;
let quizCombo = 0;
let currentInput = [];
let quizTimerId = null;
const TIME_LIMIT = 30;
let timeLeft = TIME_LIMIT;
let isProcessing = false;
let isHintActive = false;

let quizAudioCtx = null;
function initQuizAudio() {
    if (!quizAudioCtx) {
        quizAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playQuizSound(type) {
    initQuizAudio();
    if (!quizAudioCtx) return;

    const now = quizAudioCtx.currentTime;

    if (type === 'chime') {
        const osc1 = quizAudioCtx.createOscillator();
        const gain1 = quizAudioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(659.25, now);
        gain1.gain.setValueAtTime(0.4, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc1.connect(gain1);
        gain1.connect(quizAudioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.7);

        const osc2 = quizAudioCtx.createOscillator();
        const gain2 = quizAudioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(523.25, now + 0.32);
        gain2.gain.setValueAtTime(0.48, now + 0.32);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc2.connect(gain2);
        gain2.connect(quizAudioCtx.destination);
        osc2.start(now + 0.32);
        osc2.stop(now + 1.2);
    } else if (type === 'tap') {
        const osc = quizAudioCtx.createOscillator();
        const gain = quizAudioCtx.createGain();
        osc.connect(gain);
        gain.connect(quizAudioCtx.destination);
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
    } else if (type === 'cancel') {
        const osc = quizAudioCtx.createOscillator();
        const gain = quizAudioCtx.createGain();
        osc.connect(gain);
        gain.connect(quizAudioCtx.destination);
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
    } else if (type === 'correct') {
        const osc = quizAudioCtx.createOscillator();
        const gain = quizAudioCtx.createGain();
        osc.connect(gain);
        gain.connect(quizAudioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
    } else if (type === 'wrong') {
        const osc = quizAudioCtx.createOscillator();
        const gain = quizAudioCtx.createGain();
        osc.connect(gain);
        gain.connect(quizAudioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
    } else if (type === 'hint') {
        const osc = quizAudioCtx.createOscillator();
        const gain = quizAudioCtx.createGain();
        osc.connect(gain);
        gain.connect(quizAudioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    }
}

function triggerHaptic(type) {
    if (navigator.vibrate) {
        if (type === 'short') navigator.vibrate(20);
        else if (type === 'error') navigator.vibrate([40, 50, 40]);
    }
}

function getChosung(char) {
    const code = char.charCodeAt(0) - 0xAC00;
    if (code >= 0 && code <= 11171) {
        return CHOSUNG_LIST[Math.floor(code / 588)];
    }
    return char;
}

function startLandmarkQuizGame() {
    quizScore = 0;
    quizCombo = 0;
    solvedCount = 0;
    wrongAttempts = 0;
    quizQueue = [...RAW_DATA].sort(() => Math.random() - 0.5);

    const quizScreen = document.getElementById("quiz-screen");
    const gameOverScreen = document.getElementById("game-over-screen");
    if (quizScreen) quizScreen.style.display = "flex";
    if (gameOverScreen) gameOverScreen.style.display = "none";

    const scoreInd = document.getElementById("score-indicator");
    if (scoreInd) scoreInd.textContent = "SCORE: 0";
    updateCombo();

    loadQuizQuestion();
}

function updateQuizNotice() {
    const timerHintNotice = document.getElementById("timer-hint-notice");
    if (!timerHintNotice) return;
    const remainingLives = 3 - wrongAttempts;
    if (!isHintActive) {
        timerHintNotice.innerHTML = `⏳ <span class="notice-highlight">30초</span> 후 초성 힌트가 열려요! (남은 기회: <span class="strike-highlight">${remainingLives}회</span>)`;
    } else {
        timerHintNotice.innerHTML = `💡 초성 힌트를 참고해 맞혀보세요! (남은 기회: <span class="strike-highlight">${remainingLives}회</span>)`;
    }
}

function startQuizTimer() {
    clearInterval(quizTimerId);
    timeLeft = TIME_LIMIT;
    isHintActive = false;

    const hintAlert = document.getElementById("hint-alert");
    const timeText = document.getElementById("time-text");
    const timerBox = document.getElementById("timer-box");
    const alarmIcon = document.getElementById("alarm-icon");
    const timerFill = document.getElementById("timer-fill");

    if (hintAlert) hintAlert.style.display = "none";
    updateQuizNotice();

    if (timeText) timeText.textContent = `${timeLeft}s`;
    if (timerBox) timerBox.classList.remove("urgent");
    if (alarmIcon) alarmIcon.classList.remove("ringing");
    if (timerFill) {
        timerFill.style.width = "100%";
        timerFill.style.background = "linear-gradient(90deg, #10b981, #38bdf8)";
    }

    quizTimerId = setInterval(() => {
        timeLeft -= 0.1;
        const currentSec = Math.max(0, Math.ceil(timeLeft));
        if (timeText) timeText.textContent = `${currentSec}s`;

        const pct = Math.max(0, (timeLeft / TIME_LIMIT) * 100);
        if (timerFill) timerFill.style.width = `${pct}%`;

        if (timeLeft <= 3) {
            if (timerBox) timerBox.classList.add("urgent");
            if (alarmIcon) alarmIcon.classList.add("ringing");
            if (timerFill) timerFill.style.background = "#ef4444";
        }

        if (timeLeft <= 0) {
            clearInterval(quizTimerId);
            if (timeText) timeText.textContent = `0s`;
            if (timerFill) timerFill.style.width = `0%`;
            triggerHintMode();
        }
    }, 100);
}

function triggerHintMode() {
    isHintActive = true;
    quizCombo = 0;
    updateCombo();
    playQuizSound('hint');
    triggerHaptic('error');

    const alarmIcon = document.getElementById("alarm-icon");
    const hintAlert = document.getElementById("hint-alert");
    if (alarmIcon) alarmIcon.classList.remove("ringing");
    if (hintAlert) hintAlert.style.display = "block";
    updateQuizNotice();

    resetInputsToTiles();
    renderSlots();
}

function resetInputsToTiles() {
    currentInput.forEach(item => {
        const btn = document.getElementById(`tile-${item.tileId}`);
        if (btn) btn.classList.remove("used");
    });
    currentInput = [];
}

function updateCombo() {
    const comboBadge = document.getElementById("combo-badge");
    if (!comboBadge) return;
    if (quizCombo > 1) {
        comboBadge.textContent = `🔥 ${quizCombo} COMBO`;
        comboBadge.classList.add("active");
    } else {
        comboBadge.classList.remove("active");
    }
}

function loadQuizQuestion() {
    if (quizQueue.length === 0) {
        quizQueue = [...RAW_DATA].sort(() => Math.random() - 0.5);
    }

    isProcessing = false;
    wrongAttempts = 0;
    const current = quizQueue[0];
    currentInput = [];

    const windowShutter = document.getElementById("window-shutter");
    const passportStamp = document.getElementById("passport-stamp");
    const tmiCard = document.getElementById("tmi-card");
    const stageIndicator = document.getElementById("stage-indicator");
    const landmarkImg = document.getElementById("landmark-img");
    const slotsContainer = document.getElementById("slots-container");
    const tilesContainer = document.getElementById("tiles-container");

    if (windowShutter) {
        windowShutter.style.transition = "none";
        windowShutter.classList.add("closed");
        void windowShutter.offsetHeight;
    }

    if (passportStamp) passportStamp.className = "passport-stamp";
    if (tmiCard) tmiCard.classList.remove("show");
    if (stageIndicator) stageIndicator.textContent = `SUCCESS: ${solvedCount} / ${TARGET_SOLVED}`;
    
    if (landmarkImg) {
        landmarkImg.src = encodeURI(current.img);
        const targetPos = current.pos || "bottom center";
        landmarkImg.style.objectPosition = targetPos;

        if (current.view === "osaka") {
            landmarkImg.style.transform = "translateY(16px)";
        } else if (current.view === "tower") {
            landmarkImg.style.transform = "translateY(12px)";
        } else if (current.view === "taj") {
            landmarkImg.style.transform = "translateY(10px)";
        } else if (current.view === "moraine") {
            landmarkImg.style.transform = "translateY(6px)";
        } else {
            landmarkImg.style.transform = "translateY(8px)";
        }
    }

    setTimeout(() => {
        playQuizSound('chime');
        if (windowShutter) {
            windowShutter.style.transition = "transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)";
            windowShutter.classList.remove("closed");
        }
    }, 150);

    if (slotsContainer) {
        slotsContainer.innerHTML = "";
        for (let i = 0; i < current.answer.length; i++) {
            const slot = document.createElement("div");
            slot.className = "slot-box";
            slot.dataset.index = i;
            slot.addEventListener("click", () => handleSlotClick(i));
            slotsContainer.appendChild(slot);
        }
    }

    const answerChars = current.answer.split("");
    const letters = [...answerChars];
    const candidateDummies = [...current.dummy, ...FALLBACK_CHARS];
    for (let char of candidateDummies) {
        if (letters.length >= 8) break;
        if (!letters.includes(char)) {
            letters.push(char);
        }
    }
    letters.sort(() => Math.random() - 0.5);

    if (tilesContainer) {
        tilesContainer.innerHTML = "";
        letters.forEach((char, id) => {
            const btn = document.createElement("button");
            btn.className = "tile-btn";
            btn.textContent = char;
            btn.id = `tile-${id}`;
            btn.addEventListener("click", () => handleTileClick(char, id));
            tilesContainer.appendChild(btn);
        });
    }

    startQuizTimer();
}

function handleTileClick(char, id) {
    if (isProcessing) return;
    const current = quizQueue[0];
    if (currentInput.length >= current.answer.length) return;

    playQuizSound('tap');
    triggerHaptic('short');

    const tileBtn = document.getElementById(`tile-${id}`);
    if (tileBtn) tileBtn.classList.add("used");

    currentInput.push({ char, tileId: id });
    renderSlots();

    if (currentInput.length === current.answer.length) {
        checkAnswer();
    }
}

function handleSlotClick(index) {
    if (isProcessing || !currentInput[index]) return;

    playQuizSound('cancel');
    triggerHaptic('short');

    const removed = currentInput.splice(index, 1)[0];
    const tileBtn = document.getElementById(`tile-${removed.tileId}`);
    if (tileBtn) tileBtn.classList.remove("used");

    renderSlots();
}

function renderSlots() {
    const current = quizQueue[0];
    const slotsContainer = document.getElementById("slots-container");
    if (!slotsContainer) return;
    const slots = slotsContainer.querySelectorAll(".slot-box");

    slots.forEach((slot, idx) => {
        if (currentInput[idx]) {
            slot.innerHTML = currentInput[idx].char;
            slot.style.borderBottomColor = "#38bdf8";
        } else if (isHintActive) {
            const chosung = getChosung(current.answer[idx]);
            slot.innerHTML = `<span class="chosung-hint">${chosung}</span>`;
            slot.style.borderBottomColor = "#f59e0b";
        } else {
            slot.innerHTML = "";
            slot.style.borderBottomColor = "#38bdf8";
        }
    });
}

function checkAnswer() {
    const current = quizQueue[0];
    const enteredWord = currentInput.map(item => item.char).join("");
    const stageIndicator = document.getElementById("stage-indicator");
    const scoreIndicator = document.getElementById("score-indicator");
    const stampBody = document.getElementById("stamp-body");
    const stampDate = document.getElementById("stamp-date");
    const passportStamp = document.getElementById("passport-stamp");
    const tmiText = document.getElementById("tmi-text");
    const tmiCard = document.getElementById("tmi-card");
    const slotsContainer = document.getElementById("slots-container");
    const windowShutter = document.getElementById("window-shutter");

    if (enteredWord === current.answer) {
        isProcessing = true;
        clearInterval(quizTimerId);
        playQuizSound('correct');
        triggerHaptic('short');

        solvedCount++;
        if (stageIndicator) stageIndicator.textContent = `SUCCESS: ${solvedCount} / ${TARGET_SOLVED}`;

        if (!isHintActive) {
            quizCombo++;
            const timeBonus = Math.floor(timeLeft * 10);
            const comboBonus = quizCombo > 1 ? quizCombo * 25 : 0;
            quizScore += 100 + timeBonus + comboBonus;
        } else {
            quizScore += 50;
        }

        if (scoreIndicator) scoreIndicator.textContent = `SCORE: ${quizScore}`;
        updateCombo();

        if (stampBody) stampBody.textContent = "✈️ ENTRY";
        if (stampDate) stampDate.textContent = `ICN • STAGE ${solvedCount}`;
        if (passportStamp) passportStamp.className = "passport-stamp show";
        if (tmiText) tmiText.textContent = current.tmi;
        if (tmiCard) tmiCard.classList.add("show");

        setTimeout(() => {
            if (currentStep !== 'event-game') return;

            quizQueue.shift();
            if (solvedCount >= TARGET_SOLVED) {
                finishGame();
            } else {
                if (passportStamp) passportStamp.classList.remove("show");
                if (windowShutter) {
                    windowShutter.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
                    windowShutter.classList.add("closed");
                }

                setTimeout(() => {
                    if (currentStep === 'event-game') {
                        loadQuizQuestion();
                    }
                }, 550);
            }
        }, 2600);

    } else {
        wrongAttempts++;
        isProcessing = true;
        quizCombo = 0;
        updateCombo();
        playQuizSound('wrong');
        triggerHaptic('error');
        if (slotsContainer) slotsContainer.classList.add("shake");
        updateQuizNotice();

        if (wrongAttempts >= 3) {
            clearInterval(quizTimerId);
            setTimeout(() => {
                if (slotsContainer) slotsContainer.classList.remove("shake");
                revealCorrectAnswerAndSkip(current);
            }, 450);
        } else {
            setTimeout(() => {
                if (slotsContainer) slotsContainer.classList.remove("shake");
                resetInputsToTiles();
                renderSlots();
                isProcessing = false;
            }, 450);
        }
    }
}

function revealCorrectAnswerAndSkip(current) {
    const slotsContainer = document.getElementById("slots-container");
    const stampBody = document.getElementById("stamp-body");
    const stampDate = document.getElementById("stamp-date");
    const passportStamp = document.getElementById("passport-stamp");
    const tmiText = document.getElementById("tmi-text");
    const tmiCard = document.getElementById("tmi-card");
    const windowShutter = document.getElementById("window-shutter");

    if (slotsContainer) {
        const slots = slotsContainer.querySelectorAll(".slot-box");
        slots.forEach((slot, idx) => {
            slot.textContent = current.answer[idx];
            slot.classList.add("reveal-answer");
        });
    }

    if (stampBody) stampBody.textContent = "❌ DENIED";
    if (stampDate) stampDate.textContent = `ICN • RECHECK`;
    if (passportStamp) passportStamp.className = "passport-stamp fail show";
    if (tmiText) tmiText.textContent = `[정답: ${current.answer}] ${current.tmi}`;
    if (tmiCard) tmiCard.classList.add("show");

    setTimeout(() => {
        if (currentStep !== 'event-game') return;

        const failedItem = quizQueue.shift();
        quizQueue.push(failedItem);

        if (passportStamp) passportStamp.classList.remove("show");
        if (windowShutter) {
            windowShutter.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
            windowShutter.classList.add("closed");
        }

        setTimeout(() => {
            if (currentStep === 'event-game') {
                loadQuizQuestion();
            }
        }, 550);
    }, 3000);
}

function finishGame() {
    clearInterval(quizTimerId);
    playQuizSound('chime');

    const quizScreen = document.getElementById("quiz-screen");
    const gameOverScreen = document.getElementById("game-over-screen");
    const finalScoreVal = document.getElementById("final-score-val");

    if (quizScreen) quizScreen.style.display = "none";
    if (gameOverScreen) gameOverScreen.style.display = "flex";
    if (finalScoreVal) finalScoreVal.textContent = `${quizScore} PTS`;
}

function restartGame() {
    startLandmarkQuizGame();
}

/* ==========================================================================
   08. ANALYTICS & 10-MINUTE SESSION IN/OUT TRACKER
   ========================================================================== */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzBQcFxHn6fFGbQn3Mmlw6rVyayNaXqOboF-SDIc4pgo3f36RJbf7lWET5usChbzBpi/exec";
const ADMIN_PASSCODE = "!DxpR26";
const SESSION_TIMEOUT_MS = 10 * 60 * 1000;

let currentViewingContent = null;
let viewStartTime = null;

let localStats = JSON.parse(localStorage.getItem('incheon_stats')) || {
    hits: {},
    durations: {},
    days: { "일":0, "월":0, "화":0, "수":0, "목":0, "금":0, "토":0 },
    hours: {},
    totalSessions: 0,
    sessionDurations: [],
    sessionLogs: []
};

let sessionData = JSON.parse(localStorage.getItem('incheon_current_session')) || null;

function initSessionTracker() {
    const now = Date.now();
    
    if (sessionData) {
        if (now - sessionData.lastActive > SESSION_TIMEOUT_MS) {
            closeSession(sessionData.lastActive, "10분 타임아웃 자동 OUT");
            startNewSession(now);
        } else {
            sessionData.lastActive = now;
            localStorage.setItem('incheon_current_session', JSON.stringify(sessionData));
        }
    } else {
        startNewSession(now);
    }

    const updateActivity = () => {
        if (!sessionData) {
            startNewSession(Date.now());
            return;
        }
        const currentTime = Date.now();
        if (currentTime - sessionData.lastActive > SESSION_TIMEOUT_MS) {
            closeSession(sessionData.lastActive, "10분 타임아웃 자동 OUT");
            startNewSession(currentTime);
        } else {
            sessionData.lastActive = currentTime;
            localStorage.setItem('incheon_current_session', JSON.stringify(sessionData));
        }
    };

    window.addEventListener('click', updateActivity, { passive: true });
    window.addEventListener('touchstart', updateActivity, { passive: true });
    window.addEventListener('scroll', updateActivity, { passive: true });
}

function startNewSession(startTime) {
    localStats.totalSessions = (localStats.totalSessions || 0) + 1;
    localStorage.setItem('incheon_stats', JSON.stringify(localStats));

    sessionData = {
        id: localStats.totalSessions,
        inTime: startTime,
        lastActive: startTime
    };
    localStorage.setItem('incheon_current_session', JSON.stringify(sessionData));

    sendGoogleSheetLog({
        type: "SESSION_IN",
        contentName: `사용자 #${sessionData.id} 진입`,
        duration: 0,
        inTime: new Date(startTime).toLocaleString('ko-KR'),
        outTime: "-"
    });
}

function closeSession(endTime, reason) {
    if (!sessionData) return;
    const durSec = Math.max(1, Math.round((endTime - sessionData.inTime) / 1000));

    if (!localStats.sessionLogs) localStats.sessionLogs = [];
    localStats.sessionLogs.unshift({
        id: sessionData.id,
        inTime: new Date(sessionData.inTime).toLocaleTimeString('ko-KR'),
        outTime: new Date(endTime).toLocaleTimeString('ko-KR'),
        durationSec: durSec,
        type: reason
    });

    if (localStats.sessionLogs.length > 50) localStats.sessionLogs.pop();

    if (!localStats.sessionDurations) localStats.sessionDurations = [];
    localStats.sessionDurations.push(durSec);
    localStorage.setItem('incheon_stats', JSON.stringify(localStats));

    sendGoogleSheetLog({
        type: "SESSION_OUT",
        contentName: `사용자 #${sessionData.id} 이탈 (${reason})`,
        duration: durSec,
        inTime: new Date(sessionData.inTime).toLocaleString('ko-KR'),
        outTime: new Date(endTime).toLocaleString('ko-KR')
    });

    sessionData = null;
    localStorage.removeItem('incheon_current_session');
}

function sendGoogleSheetLog(data) {
    if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_URL.startsWith("http")) return;
    const now = new Date();
    const daysMap = ["일", "월", "화", "수", "목", "금", "토"];

    const payload = JSON.stringify({
        timestamp: now.toLocaleString('ko-KR'),
        type: data.type || "VIEW",
        contentName: data.contentName || "페이지",
        duration: data.duration || 0,
        inTime: data.inTime || "-",
        outTime: data.outTime || "-",
        dayOfWeek: daysMap[now.getDay()],
        hour: now.getHours()
    });

    if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'text/plain' });
        navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
    } else {
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: payload
        }).catch(() => {});
    }
}

function finishCurrentViewing() {
    if (!currentViewingContent || !viewStartTime) return;
    const durationSec = Math.round((Date.now() - viewStartTime) / 1000);
    
    if (durationSec >= 1) {
        const now = new Date();
        const daysMap = ["일", "월", "화", "수", "목", "금", "토"];
        const dayStr = daysMap[now.getDay()];
        const hourStr = now.getHours();

        if (!localStats.hits) localStats.hits = {};
        if (!localStats.durations) localStats.durations = {};
        if (!localStats.days) localStats.days = { "일":0, "월":0, "화":0, "수":0, "목":0, "금":0, "토":0 };
        if (!localStats.hours) localStats.hours = {};

        localStats.hits[currentViewingContent] = (localStats.hits[currentViewingContent] || 0) + 1;
        if (!localStats.durations[currentViewingContent]) {
            localStats.durations[currentViewingContent] = [];
        }
        localStats.durations[currentViewingContent].push(durationSec);
        localStats.days[dayStr] = (localStats.days[dayStr] || 0) + 1;
        localStats.hours[hourStr] = (localStats.hours[hourStr] || 0) + 1;
        
        localStorage.setItem('incheon_stats', JSON.stringify(localStats));

        sendGoogleSheetLog({
            type: "CONTENT_VIEW",
            contentName: currentViewingContent,
            duration: durationSec
        });
    }
    currentViewingContent = null;
    viewStartTime = null;
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        finishCurrentViewing();
    } else if (document.visibilityState === 'visible') {
        const now = Date.now();
        if (sessionData && (now - sessionData.lastActive > SESSION_TIMEOUT_MS)) {
            closeSession(sessionData.lastActive, "10분 타임아웃 자동 OUT");
            startNewSession(now);
        }
    }
});

let adminTapCount = 0;
let adminTapTimer = null;

function handleHiddenAdminTap() {
    adminTapCount++;
    clearTimeout(adminTapTimer);
    adminTapTimer = setTimeout(() => {
        adminTapCount = 0;
    }, 3000);

    if (adminTapCount >= 5) {
        adminTapCount = 0;
        clearTimeout(adminTapTimer);
        promptAdminAccess();
    }
}

function promptAdminAccess() {
    const pinEl = document.getElementById('admin-pin');
    if (pinEl) pinEl.value = '';
    const authModal = document.getElementById('admin-auth-modal');
    if (authModal) authModal.style.display = 'flex';
}

function closeAdminAuth() {
    const authModal = document.getElementById('admin-auth-modal');
    if (authModal) authModal.style.display = 'none';
}

function verifyAdminPin() {
    const pinEl = document.getElementById('admin-pin');
    const enteredPin = pinEl ? pinEl.value.trim() : '';
    
    if (enteredPin === ADMIN_PASSCODE) {
        closeAdminAuth();
        openAdminDashboard();
    } else {
        alert("비밀번호가 일치하지 않습니다.");
        if (pinEl) pinEl.value = '';
    }
}

function openAdminDashboard() {
    document.getElementById('main-screen').style.display = 'none';
    hideAllSubViews();
    renderAdminDashboardData();

    const adminScreen = document.getElementById('admin-screen');
    if (adminScreen) {
        adminScreen.style.display = 'flex';
        adminScreen.classList.add('active');
        adminScreen.scrollTop = 0;
    }
}

function closeAdminDashboard() {
    const adminScreen = document.getElementById('admin-screen');
    if (adminScreen) {
        adminScreen.style.display = 'none';
        adminScreen.classList.remove('active');
    }
    document.getElementById('main-screen').style.display = 'flex';
}

function renderAdminDashboardData() {
    const sorted = Object.keys(localStats.hits).sort((a, b) => localStats.hits[b] - localStats.hits[a]);
    const tableBody = document.getElementById('stat-content-tbody');
    if (tableBody) {
        tableBody.innerHTML = '';
        if (sorted.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">데이터 없음</td></tr>';
        } else {
            sorted.forEach(name => {
                const hits = localStats.hits[name];
                const durArr = localStats.durations[name] || [];
                const avgSec = durArr.length > 0 
                    ? Math.round(durArr.reduce((a, b) => a + b, 0) / durArr.length) 
                    : 0;

                tableBody.innerHTML += `
                    <tr>
                        <td>${name}</td>
                        <td><strong>${hits}</strong>회</td>
                        <td>${avgSec}초</td>
                    </tr>
                `;
            });
        }
    }

    const sessionLogBody = document.getElementById('stat-session-log-tbody');
    if (sessionLogBody) {
        sessionLogBody.innerHTML = '';
        const logs = localStats.sessionLogs || [];
        if (logs.length === 0) {
            sessionLogBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">기록된 세션 로그 없음</td></tr>';
        } else {
            logs.forEach(log => {
                const min = Math.floor(log.durationSec / 60);
                const sec = log.durationSec % 60;
                const durText = min > 0 ? `${min}분 ${sec}초` : `${sec}초`;
                sessionLogBody.innerHTML += `
                    <tr>
                        <td>#${log.id}</td>
                        <td>${log.inTime}</td>
                        <td>${log.outTime}</td>
                        <td><strong>${durText}</strong></td>
                    </tr>
                `;
            });
        }
    }

    const dayList = document.getElementById('stat-day-list');
    if (dayList) {
        dayList.innerHTML = '';
        ["월", "화", "수", "목", "금", "토", "일"].forEach(day => {
            dayList.innerHTML += `<li>${day}요일: ${localStats.days[day] || 0}회</li>`;
        });
    }

    const hourList = document.getElementById('stat-hour-list');
    if (hourList) {
        hourList.innerHTML = '';
        const sortedHours = Object.keys(localStats.hours).sort((a, b) => localStats.hours[b] - localStats.hours[a]);
        if (sortedHours.length === 0) {
            hourList.innerHTML = '<li>집계 없음</li>';
        } else {
            sortedHours.slice(0, 3).forEach(h => {
                hourList.innerHTML += `<li>${h}시 대 (${localStats.hours[h]}회)</li>`;
            });
        }
    }

    const totalSessions = localStats.totalSessions || 0;
    const sessionDurs = localStats.sessionDurations || [];
    const avgSessionSec = sessionDurs.length > 0 
        ? Math.round(sessionDurs.reduce((a, b) => a + b, 0) / sessionDurs.length) 
        : 0;

    const min = Math.floor(avgSessionSec / 60);
    const sec = avgSessionSec % 60;
    const timeDisplay = min > 0 ? `${min}분 ${sec}초` : `${sec}초`;

    const statTotalSessionsEl = document.getElementById('stat-total-sessions');
    if (statTotalSessionsEl) statTotalSessionsEl.innerText = `${totalSessions}회`;
    
    const statAvgTimeEl = document.getElementById('stat-avg-session-time');
    if (statAvgTimeEl) statAvgTimeEl.innerText = timeDisplay;
}

function resetLocalStats() {
    if (confirm("누적된 로컬 통계 데이터를 초기화하시겠습니까? (구글 시트 데이터는 유지됩니다)")) {
        localStats = {
            hits: {},
            durations: {},
            days: { "일":0, "월":0, "화":0, "수":0, "목":0, "금":0, "토":0 },
            hours: {},
            totalSessions: 0,
            sessionDurations: [],
            sessionLogs: []
        };
        localStorage.removeItem('incheon_stats');
        renderAdminDashboardData();
    }
}

/* ==========================================================================
   09. INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initSessionTracker();

    const header = document.querySelector('.content-header');
    if (header) {
        header.addEventListener('animationend', () => {
            header.classList.remove('fly-in');
        }, { once: true });
    }

    const audio = document.getElementById('target-audio');
    const currentTimeEl = document.getElementById('audio-current-time');
    const durationEl = document.getElementById('audio-duration');
    const icon = document.getElementById('audio-icon');
    const text = document.getElementById('audio-btn-text');
    const btn = document.getElementById('audio-toggle-btn');

    if (!audio) return;

    audio.addEventListener('loadedmetadata', () => {
        if (durationEl && !isNaN(audio.duration)) {
            durationEl.innerText = formatTime(audio.duration);
        }
    });

    audio.addEventListener('timeupdate', () => {
        if (currentTimeEl) {
            currentTimeEl.innerText = formatTime(audio.currentTime);
        }
    });

    audio.addEventListener('ended', () => {
        if (icon) icon.className = 'fa-solid fa-play';
        if (text) text.innerText = '음성 안내';
        if (btn) btn.classList.remove('playing');
        if (currentTimeEl) currentTimeEl.innerText = '00:00';
    });
});