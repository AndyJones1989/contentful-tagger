const contentful = require('contentful-management');

const tagContents = (accessToken, spaceName, environment, requiredTag) => {

const client = contentful.createClient({
    accessToken: accessToken
});

client.getSpace(spaceName).then((space) => {
    space.getEnvironment(environment).then((environment) => {
        environment.getEntries().then((entries) => {
            entryLoop:
            for (const entry of entries.items) {
                console.log(entry.metadata.tags);

                for (const tag of entry.metadata.tags) {
                    if (tag.sys.id === requiredTag){
                        console.log('has ' + requiredTag);
                        continue entryLoop;
                    };
                }
                console.log(requiredTag + ' not found');
                entry.metadata.tags.push({sys:{type:'Link', linkType:'Tag', id: requiredTag}});
                entry.update().then((entry)=> entry.publish());
            }
        });
    });
});
}
// put your own values in here
const accessToken = '';
const mySpace = '';
const env = 'master';
const tag = 'tag1';

tagContents(accessToken, mySpace, env, tag);