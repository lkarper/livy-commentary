import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CommentaryReadComment from './CommentaryReadComment';

describe('CommentaryReadComment component', () => {
    it('renders the UI as expected', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <CommentaryReadComment />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<CommentaryReadComment />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
