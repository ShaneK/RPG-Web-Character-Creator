import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData, addCharacter, changeCharacter, getData, deleteCharacter} from '../actions';
import popup from 'react-popup';
import {Archetype, Career} from './index';

class CharacterSelect extends React.Component {

    handleClick = (type) => {
        let content = <div/>;
        if (type === 'archetype') content = <Archetype/>;
        if (type === 'career') content = <Career/>;
        popup.create({
            title: `Select ${type}`,
            className: 'alert',
            content: (content),
        })
    };

    handleNewCharacter = () => {
        this.props.addCharacter();
        this.props.getData();
    };

    handleDeleteCharacter = () => {
        this.props.deleteCharacter();
        this.props.getData();
    };

    handleSelect = (event) => {
        const {getData, changeCharacter} = this.props;
        changeCharacter(event.target.value);
        getData();
        event.preventDefault();
    };

    handleChange = (type, event) => {
        const {changeData, description} = this.props;
        let newObj = {...description};
        newObj[type] = event.target.value;
        changeData(newObj, 'description');
        event.preventDefault();
    };

    render() {
        const {archetype, archetypes, careers, career, description, characterList, character} = this.props;
        if (character===null || characterList === null) return <div/>;
        return (
            <div className='inlineblock' style={{width: '60%'}}>
                <div className='module-header'>CHARACTER</div>
                <hr />
                <select value={character} onChange={this.handleSelect}>
                    {Object.keys(characterList).map((key)=>
                        <option value={key} key={key}>{characterList[key].description ? characterList[key].description.name : ''}</option>
                    )}
                </select>
                <button onClick={this.handleNewCharacter}>New Character</button>
                <button onClick={this.handleDeleteCharacter}>Delete Character</button>
                <div className='fieldLabel'>CHARACTER NAME:
                    <input type='text' value={description.name} maxLength='25' onChange={this.handleChange.bind(this, 'name')}/>
                </div>
                <hr />
                <div className='fieldLabel' onClick={this.handleClick.bind(this, 'archetype')}>ARCHETYPE: <div className='fieldData'>{archetype===null ? '' : archetypes[archetype].name}</div>
                </div>
                <hr />
                <div className='fieldLabel'onClick={this.handleClick.bind(this, 'career')}>CAREER: <div className='fieldData'>{career===null ? '' : careers[career].name}</div>
                </div>
                <hr />
                <div className='fieldLabel'>PLAYER NAME:
                    <input type='text' value={description.playerName} maxLength='25' onChange={this.handleChange.bind(this, 'playerName')}/>
                </div>
                <hr />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        career: state.career,
        careers: state.careers,
        description: state.description,
        user: state.user,
        characterList: state.characterList,
        character: state.character,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData, addCharacter, changeCharacter, getData, deleteCharacter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CharacterSelect);