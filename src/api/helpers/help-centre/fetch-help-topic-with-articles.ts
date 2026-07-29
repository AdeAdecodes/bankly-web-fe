import { HelpTopicWithArticles } from '~/types';
import fetchOnePayloadCollection from '../shared/fetch-one-payload-collection';
import fetchPayloadCollection from '../shared/fetch-payload-collection';

export default async function fetchHelpTopicWithArticles(slug: string) {
  try {
    const topic = await fetchHelpTopic(slug);

    if (topic) {
      const articles = await fetchHelpTopicArticles(topic.id);

      return { ...topic, articles } as HelpTopicWithArticles;
    }
  } catch (e) {
    return console.log(e);
  }
}

async function fetchHelpTopic(slug: string) {
  return fetchOnePayloadCollection('help-topics', {
    where: { slug: { equals: slug } },
  });
}

async function fetchHelpTopicArticles(topicId: string) {
  return fetchPayloadCollection('help-articles', {
    where: { topic: { equals: topicId } },
  }).then((x) => x.docs);
}
