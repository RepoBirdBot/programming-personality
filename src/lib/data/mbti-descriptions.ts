export const MBTI_TYPES = [
	'ISTJ',
	'ISFJ',
	'INFJ',
	'INTJ',
	'ISTP',
	'ISFP',
	'INFP',
	'INTP',
	'ESTP',
	'ESFP',
	'ENFP',
	'ENTP',
	'ESTJ',
	'ESFJ',
	'ENFJ',
	'ENTJ'
] as const;

export type MBTIType = (typeof MBTI_TYPES)[number];

export const mbtiDescriptions: { [K in MBTIType]: string } = {
	ISTJ: 'Responsible, organized, and practical, ISTJs value tradition and reliability, approaching tasks methodically and fulfilling commitments with dedication.',
	ISFJ: 'Quiet, caring, and dependable, ISFJs are motivated by a deep sense of duty and a desire to help others, often putting the needs of people and traditions first.',
	INFJ: 'Insightful, creative, and idealistic, INFJs combine strong values with empathy, striving to guide and support others toward meaningful growth.',
	INTJ: 'Strategic, independent, and visionary, INTJs analyze complex systems and pursue innovative solutions, preferring structure and long-term planning.',
	ISTP: 'Adaptable, analytical, and action-oriented, ISTPs excel at solving practical problems using logic and hands-on skills, thriving in situations that require flexibility.',
	ISFP: 'Gentle, adaptable, and sensitive, ISFPs value personal freedom and creativity, expressing themselves through actions and seeking harmony in their surroundings.',
	INFP: 'Imaginative, idealistic, and empathetic, INFPs are guided by strong personal values and seek deep meaning and authenticity in their lives and relationships.',
	INTP: 'Innovative, logical, and curious, INTPs enjoy exploring abstract ideas, analyzing theories, and seeking clarity through independent reflection.',
	ESTP: 'Energetic, pragmatic, and perceptive, ESTPs thrive in dynamic environments, skillfully navigating challenges and engaging others with confidence and resourcefulness.',
	ESFP: 'Enthusiastic, sociable, and spontaneous, ESFPs enjoy living in the moment, bringing excitement and warmth to social gatherings and valuing sensory experiences.',
	ENFP: 'Warm, imaginative, and expressive, ENFPs see possibilities everywhere, connect ideas and people effortlessly, and value authenticity and inspiration.',
	ENTP: 'Inventive, outspoken, and quick-thinking, ENTPs love debating ideas, exploring new possibilities, and generating solutions to complex problems.',
	ESTJ: 'Efficient, organized, and decisive, ESTJs value order and tradition, naturally taking charge to bring structure and clarity to projects and groups.',
	ESFJ: 'Sociable, conscientious, and supportive, ESFJs focus on creating harmony, meeting the needs of others, and maintaining traditions within their communities.',
	ENFJ: 'Charismatic, supportive, and idealistic, ENFJs inspire and motivate others, excelling at understanding feelings and guiding people toward shared goals.',
	ENTJ: 'Assertive, strategic, and determined, ENTJs are natural leaders who excel at organizing resources and people to achieve ambitious objectives.'
};
