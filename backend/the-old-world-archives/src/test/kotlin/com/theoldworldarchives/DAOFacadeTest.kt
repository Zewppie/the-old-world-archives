package com.theoldworldarchives


import com.theoldworldarchives.dao.DAOFacade
import com.theoldworldarchives.dao.DAOFacadeImpl
import com.theoldworldarchives.models.Post
import com.theoldworldarchives.models.Posts
import com.theoldworldarchives.models.User
import com.theoldworldarchives.models.Users
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.After
import org.junit.Before
import org.junit.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class DAOFacadeTest {

    private val dao: DAOFacade = DAOFacadeImpl()

    @Before
    fun setupTestTables() {
        connectToTestDatabase()
        transaction {
            SchemaUtils.create(Users, Posts)
        }
        runBlocking {
            dao.addNewUser("xivo_colzione", "passwd")
            dao.addNewUser("zewppie", "limbus_company")
            dao.addNewPost("funny title", "content_warning_4d93e4cc.webm", "funny description", "xivo_colzione")
        }
    }

    @After
    fun destroyTestTables() {
        transaction {
            SchemaUtils.drop(Users, Posts)
        }
    }

    // Post database tests
    @Test
    fun testAllPosts() = runBlocking {
        val posts = dao.allPosts()
        assertEquals(1, posts.size)
        assertEquals("funny title", posts[0].title)
    }

    @Test
    fun testGetPostById() = runBlocking {
        val post = dao.post(1)
        assertNotNull(post)
        assertEquals("funny title", post?.title)
    }

    @Test
    fun testAddNewPost() = runBlocking {
        val newPost = dao.addNewPost("funnier title", "/path/to/video_2", "funnier description", "zewppie")
        assertNotNull(newPost)
        assertEquals("funnier title", newPost.title)
    }

    @Test
    fun testEditPost() = runBlocking {
        val edited = dao.editPost(1, "edited title", "/path/to/edited_video.webm", "edited description", "xivo_colzione")
        assertTrue(edited)

        val post = dao.post(1)
        assertNotNull(post)
        assertEquals("edited title", post?.title)
    }

    @Test
    fun testDeletePost() = runBlocking {
        val deleted = dao.deletePost(1)
        assertTrue(deleted)

        val post = dao.post(1)
        assertNull(post)
    }

    // User database tests
    @Test
    fun testAllUsers() = runBlocking {
        val users = dao.allUsers()
        assertEquals(2, users.size)
        assertEquals("xivo_colzione", users[0].name)
    }

    @Test
    fun testGetUserByName() = runBlocking {
        val user = dao.user("zewppie")
        assertNotNull(user)
        assertEquals("limbus_company", user?.password)
    }

    @Test
    fun testAddNewUser() = runBlocking {
        val newUser = dao.addNewUser("new user", "12345")
        assertNotNull(newUser)
        assertEquals("new user", newUser?.name)
    }

    @Test
    fun testEditUserPassword() = runBlocking {
        val editedUser = dao.editUserPassword("xivo_colzione", "totsugeki")
        assertTrue(editedUser)

        val user = dao.user("xivo_colzione")
        assertNotNull(user)
        assertEquals("totsugeki", user?.password)
    }

    @Test
    fun deleteUser() = runBlocking {
        val deleted = dao.deleteUser("xivo_colzione")
        assertTrue(deleted)

        val user = dao.user("xivo_colzione")
        assertNull(user)
    }
}
