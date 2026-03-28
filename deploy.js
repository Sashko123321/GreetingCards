import ghpages from 'gh-pages';

ghpages.publish('dist', {
    branch: 'gh-pages',
    dotfiles: true,
    history: false, // 🔥 ключове
    silent: false
}, function(err) {
    if (err) console.error(err);
    else console.log('✅ Deploy complete!');
});