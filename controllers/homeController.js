import express from 'express';
import {join} from 'path';

const homeController = (req, res) => {
    res.render('home'); // Render the home view
}
export { homeController };