import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, IconButton, Colors } from 'react-native-paper'; // Assuming you're using react-native-paper for UI components

const Post = ({ post }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Avatar.Image size={40} source={{ uri: post.author.avatar }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.authorName}>{post.author.name}</Text>
            <Text style={styles.postTime}>{post.time}</Text>
          </View>
          <IconButton icon="dots-vertical" size={20} onPress={() => {}} />
        </View>
        {/* Post Content */}
        <Text style={styles.postContent}>{post.content}</Text>
        {/* Post Image */}
        {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
        {/* Reactions */}
        <View style={styles.reactions}>
          <IconButton icon="thumb-up" size={20} onPress={() => {}} color={Colors.blue500} />
          <IconButton icon="comment" size={20} onPress={() => {}} color={Colors.grey500} />
        </View>
        {/* Comments */}
        {post.comments.map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Avatar.Image size={30} source={{ uri: comment.author.avatar }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.authorName}>{comment.author.name}</Text>
              <Text>{comment.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorName: {
    fontWeight: 'bold',
  },
  postTime: {
    color: '#555',
  },
  postContent: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default Post;
