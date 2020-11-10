import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CommentaryHomeBookLink from './CommentaryHomeBookLink';

describe('CommentaryHomeBookLink component', () => {
    it('renders the UI as expected', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <CommentaryHomeBookLink />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const wrapper = mount(
            <BrowserRouter>
                <CommentaryHomeBookLink />
            </BrowserRouter>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
