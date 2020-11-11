import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CommentaryHome from './CommentaryHome';

describe('CommentaryHome component', () => {
    it('renders the UI as expected', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <CommentaryHome />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<CommentaryHome />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
