
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import path from 'path';

export const module = {
    rules: [
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }
    ]
};

