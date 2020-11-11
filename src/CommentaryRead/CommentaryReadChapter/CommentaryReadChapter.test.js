import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CommentaryReadChapter from './CommentaryReadChapter';

describe('CommentaryReadChapter component', () => {
    it('renders the UI as expected', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <CommentaryReadChapter />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(<CommentaryReadChapter />);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
