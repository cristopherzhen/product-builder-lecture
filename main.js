class TravelDestination extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const shadow = this.shadowRoot;

        const data = {
            name: this.getAttribute('name'),
            description: this.getAttribute('description'),
            image: this.getAttribute('image'),
            rating: this.getAttribute('rating'),
            season: this.getAttribute('season'),
            tags: (this.getAttribute('tags') || '').split(',').map(t => t.trim()).filter(Boolean),
            spots: (this.getAttribute('spots') || '').split('|').map(s => s.trim()).filter(Boolean),
            foods: (this.getAttribute('foods') || '').split('|').map(f => f.trim()).filter(Boolean),
        };

        const stars = '★'.repeat(Math.round(parseFloat(data.rating))) + '☆'.repeat(5 - Math.round(parseFloat(data.rating)));

        const tagsHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
        const spotsHTML = data.spots.map(s => `<li>${s}</li>`).join('');
        const foodsHTML = data.foods.map(f => `<li>${f}</li>`).join('');

        shadow.innerHTML = `
            <style>
                :host { display: block; }
                .card {
                    background: #fff;
                    border-radius: 14px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.10);
                    overflow: hidden;
                    transition: transform 0.25s, box-shadow 0.25s;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.16);
                }
                .img-wrap { position: relative; }
                img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    display: block;
                }
                .season-badge {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(52,152,219,0.88);
                    color: #fff;
                    font-size: 0.72rem;
                    padding: 3px 9px;
                    border-radius: 20px;
                    font-weight: 600;
                    backdrop-filter: blur(2px);
                }
                .body { padding: 1rem; flex: 1; display: flex; flex-direction: column; gap: 0.6rem; }
                .header-row { display: flex; justify-content: space-between; align-items: flex-start; }
                h3 { margin: 0; font-size: 1.15rem; color: #1a1a2e; }
                .rating { color: #f39c12; font-size: 0.9rem; white-space: nowrap; }
                .rating span { color: #888; font-size: 0.78rem; margin-left: 3px; }
                .desc { margin: 0; color: #555; font-size: 0.88rem; line-height: 1.5; }
                .tags { display: flex; flex-wrap: wrap; gap: 5px; }
                .tag {
                    background: #eaf4ff;
                    color: #2980b9;
                    font-size: 0.73rem;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-weight: 500;
                }
                .section-title { font-size: 0.8rem; font-weight: 700; color: #333; margin: 4px 0 2px; }
                ul { margin: 0; padding-left: 1.1rem; }
                ul li { font-size: 0.82rem; color: #444; line-height: 1.7; }
                .divider { border: none; border-top: 1px solid #f0f0f0; margin: 4px 0; }
                .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
            </style>
            <div class="card">
                <div class="img-wrap">
                    <img src="${data.image}" alt="${data.name}" loading="lazy">
                    <div class="season-badge">✈ ${data.season}</div>
                </div>
                <div class="body">
                    <div class="header-row">
                        <h3>${data.name}</h3>
                        <div class="rating">${stars}<span>${data.rating}</span></div>
                    </div>
                    <p class="desc">${data.description}</p>
                    <div class="tags">${tagsHTML}</div>
                    <hr class="divider">
                    <div class="two-col">
                        <div>
                            <div class="section-title">📍 추천 명소</div>
                            <ul>${spotsHTML}</ul>
                        </div>
                        <div>
                            <div class="section-title">🍽 대표 음식</div>
                            <ul>${foodsHTML}</ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('travel-destination', TravelDestination);

const destinations = [
    {
        name: '서울',
        description: '조선왕조의 고궁과 현대 문화가 공존하는 대한민국의 수도. 명동, 홍대, 한강 등 다채로운 매력이 넘칩니다.',
        image: 'https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?q=80&w=2070&auto=format&fit=crop',
        rating: '4.8',
        season: '봄 · 가을 추천',
        region: '서울',
        tags: ['문화', '쇼핑', '미식', '야경', '역사'],
        spots: ['경복궁', '북촌한옥마을', '남산서울타워', '홍대거리', '한강공원'],
        foods: ['삼겹살', '떡볶이', '광장시장 빈대떡', '마라탕', '한식 코스'],
    },
    {
        name: '부산',
        description: '대한민국 제2의 도시이자 최대 항구 도시. 해운대 해변, 감천문화마을, 자갈치시장이 어우러진 생동감 넘치는 곳.',
        image: 'https://images.unsplash.com/photo-1560874365-84db4d350e7e?q=80&w=2070&auto=format&fit=crop',
        rating: '4.7',
        season: '여름 · 가을 추천',
        region: '부산',
        tags: ['해변', '야경', '미식', '문화', '항구'],
        spots: ['해운대 해수욕장', '감천문화마을', '자갈치시장', '광안리', '흰여울문화마을'],
        foods: ['돼지국밥', '밀면', '씨앗호떡', '회', '어묵'],
    },
    {
        name: '제주도',
        description: '유네스코 3관왕 세계자연유산. 한라산, 오름, 에메랄드빛 바다가 펼쳐지는 대한민국 대표 힐링 섬.',
        image: 'https://images.unsplash.com/photo-1633693901830-6e9b9ce4df90?q=80&w=2070&auto=format&fit=crop',
        rating: '4.9',
        season: '봄 · 여름 추천',
        region: '제주도',
        tags: ['자연', '힐링', '드라이브', '오름', '해변'],
        spots: ['한라산 국립공원', '성산일출봉', '협재 해수욕장', '우도', '천지연폭포'],
        foods: ['흑돼지구이', '해산물', '고기국수', '옥돔구이', '한라봉 디저트'],
    },
    {
        name: '경주',
        description: '천 년 신라의 수도. 도시 전체가 거대한 야외 박물관이며, 유네스코 세계유산 석굴암·불국사가 있습니다.',
        image: 'https://images.unsplash.com/photo-1579214959413-5a7e634c37c9?q=80&w=2070&auto=format&fit=crop',
        rating: '4.6',
        season: '봄 · 가을 추천',
        region: '경주',
        tags: ['역사', '문화유산', '유네스코', '자전거여행'],
        spots: ['불국사', '석굴암', '첨성대', '대릉원', '동궁과 월지'],
        foods: ['경주빵', '황리단길 카페', '쌈밥', '한정식', '교동법주'],
    },
    {
        name: '전주',
        description: '조선시대 풍류와 맛의 도시. 700여 채의 한옥이 모인 전주한옥마을과 비빔밥으로 전 세계인을 사로잡는 곳.',
        image: 'https://images.unsplash.com/photo-1558225573-434a5d3c87c7?q=80&w=2070&auto=format&fit=crop',
        rating: '4.6',
        season: '봄 · 가을 추천',
        region: '전주',
        tags: ['한옥', '미식', '전통문화', '한복체험'],
        spots: ['전주한옥마을', '경기전', '전동성당', '한지박물관', '오목대'],
        foods: ['전주비빔밥', '전주콩나물국밥', '막걸리', '피순대', '오모가리 탕'],
    },
    {
        name: '강릉',
        description: '동해의 청정 바다와 커피 향이 가득한 도시. 경포대 일출, 안목해변 카페거리가 인상적입니다.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
        rating: '4.5',
        season: '여름 · 겨울 추천',
        region: '강릉',
        tags: ['해변', '카페', '드라이브', '일출', '자연'],
        spots: ['경포대 해수욕장', '안목해변 카페거리', '오죽헌', '강릉 중앙시장', '허균·허난설헌 생가'],
        foods: ['초당순두부', '짬뽕순두부', '물회', '강릉커피', '황태해장국'],
    },
    {
        name: '속초',
        description: '설악산 단풍과 동해 바다를 함께 즐길 수 있는 자연 여행의 성지. 아바이마을의 독특한 문화도 볼거리입니다.',
        image: 'https://images.unsplash.com/photo-1587595493779-994719c869e6?q=80&w=2070&auto=format&fit=crop',
        rating: '4.5',
        season: '가을 · 여름 추천',
        region: '속초',
        tags: ['자연', '등산', '해변', '단풍', '힐링'],
        spots: ['설악산 국립공원', '속초 해수욕장', '아바이마을', '청초호 유람선', '울산바위'],
        foods: ['닭강정', '오징어순대', '황태구이', '대게', '속초 아바이순대'],
    },
];

const container = document.getElementById('destinations-container');
const searchBar = document.getElementById('search-bar');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderDestinations(list) {
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p class="no-result">검색 결과가 없습니다.</p>';
        return;
    }
    list.forEach(d => {
        const el = document.createElement('travel-destination');
        el.setAttribute('name', d.name);
        el.setAttribute('description', d.description);
        el.setAttribute('image', d.image);
        el.setAttribute('rating', d.rating);
        el.setAttribute('season', d.season);
        el.setAttribute('tags', d.tags.join(','));
        el.setAttribute('spots', d.spots.join('|'));
        el.setAttribute('foods', d.foods.join('|'));
        container.appendChild(el);
    });
}

let activeRegion = 'all';

searchBar.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = destinations.filter(d => {
        const inRegion = activeRegion === 'all' || d.region === activeRegion;
        const inSearch = d.name.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q) ||
            d.tags.some(t => t.includes(q)) ||
            d.spots.some(s => s.includes(q)) ||
            d.foods.some(f => f.includes(q));
        return inRegion && inSearch;
    });
    renderDestinations(filtered);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeRegion = e.target.dataset.region;
        const q = searchBar.value.toLowerCase();
        const filtered = destinations.filter(d => {
            const inRegion = activeRegion === 'all' || d.region === activeRegion;
            const inSearch = !q || d.name.toLowerCase().includes(q) ||
                d.description.toLowerCase().includes(q) ||
                d.tags.some(t => t.includes(q)) ||
                d.spots.some(s => s.includes(q)) ||
                d.foods.some(f => f.includes(q));
            return inRegion && inSearch;
        });
        renderDestinations(filtered);
    });
});

renderDestinations(destinations);
