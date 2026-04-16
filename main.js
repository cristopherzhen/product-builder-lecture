class TravelDestination extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'destination');

        const image = document.createElement('img');
        image.setAttribute('src', this.getAttribute('image'));
        image.setAttribute('alt', this.getAttribute('name'));

        const info = document.createElement('div');
        info.setAttribute('class', 'info');

        const name = document.createElement('h3');
        name.textContent = this.getAttribute('name');

        const description = document.createElement('p');
        description.textContent = this.getAttribute('description');

        const style = document.createElement('style');
        style.textContent = `
            .destination {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                overflow: hidden;
                transition: transform 0.2s;
            }
            .destination:hover {
                transform: translateY(-5px);
            }
            img {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            .info {
                padding: 1rem;
            }
            h3 {
                margin: 0;
                color: #333;
            }
            p {
                margin-top: 0.5rem;
                color: #666;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(image);
        wrapper.appendChild(info);
        info.appendChild(name);
        info.appendChild(description);
    }
}

customElements.define('travel-destination', TravelDestination);

const destinations = [
    {
        name: '서울',
        description: '대한민국의 수도이자 가장 큰 도시입니다.',
        image: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        region: '서울'
    },
    {
        name: '부산',
        description: '대한민국 제2의 도시이자 최대의 항구 도시입니다.',
        image: 'https://images.unsplash.com/photo-1590184432920-a6d59cf34547?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        region: '부산'
    },
    {
        name: '제주도',
        description: '대한민국 최대의 섬으로, 화산섬입니다.',
        image: 'https://images.unsplash.com/photo-1590184432920-a6d59cf34547?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        region: '제주도'
    },
    {
        name: '경주',
        description: '신라의 수도였던 도시로, 역사적인 유적이 많습니다.',
        image: 'https://images.unsplash.com/photo-1579214959413-5a7e634c37c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        region: '경주'
    },
    {
        name: '전주',
        description: '한옥마을과 비빔밥으로 유명한 도시입니다.',
        image: 'https://images.unsplash.com/photo-1558225573-434a5d3c87c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        region: '전주'
    },
    {
        name: '강릉',
        description: '동해안의 대표적인 관광 도시로, 커피거리와 해변이 유명합니다.',
        image: 'https://images.unsplash.com/photo-1623961138855-a4f58c755a90?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        region: '강릉'
    },
    {
        name: '속초',
        description: '설악산과 동해바다를 모두 즐길 수 있는 도시입니다.',
        image: 'https://images.unsplash.com/photo-1587595493779-994719c869e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        region: '속초'
    }
];

const container = document.getElementById('destinations-container');
const searchBar = document.getElementById('search-bar');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderDestinations(destinationsToRender) {
    container.innerHTML = '';
    destinationsToRender.forEach(destination => {
        const el = document.createElement('travel-destination');
        el.setAttribute('name', destination.name);
        el.setAttribute('description', destination.description);
        el.setAttribute('image', destination.image);
        container.appendChild(el);
    });
}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredDestinations = destinations.filter(destination => {
        return (
            destination.name.toLowerCase().includes(searchString) ||
            destination.description.toLowerCase().includes(searchString)
        );
    });
    renderDestinations(filteredDestinations);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const region = e.target.dataset.region;
        if (region === 'all') {
            renderDestinations(destinations);
        } else {
            const filteredDestinations = destinations.filter(destination => destination.region === region);
            renderDestinations(filteredDestinations);
        }
    });
});

renderDestinations(destinations);