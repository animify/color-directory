import React from 'react';

import request from './../modules/Request';
import Intro from './../components/Intro';
import ColorBlock from './../components/ColorBlock';

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shots: [],
            loading: false,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }

    getData() {
        this.setState({
            loading: true
        });

        request
            .get('/api/popular')
            .then((response) => {
                this.setState({
                    loading: false,
                    shots: response.data.content.shots
                });
            });
    }

    renderColorBlocks(shots) {
        if (shots.length > 0) {
            return shots.map(shot => (
                <ColorBlock key={shot.id} shot={shot} />
            ));
        }

        return [];
    }

    render() {
        const shots = this.state.shots;
        const colorBlocks = this.renderColorBlocks(shots);
        const isLoading = this.state.loading;

        return (
            <section className="contain">
                <div className="row">
                    <div className="col xs-12">
                        <Intro message="The latest &amp; most popular color palettes trending on Dribbble right now." />
                    </div>
                </div>
                <div className="row shots">
                    { !isLoading ?
                        colorBlocks :
                        (<div className="loader small dark" />)
                    }
                </div>
            </section>
        );
    }
}

export default Homepage;
