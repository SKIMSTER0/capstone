<?php
/**
 * controls database logic for admin controller
 */
class admin_model extends ci_model
{
    public function __construct()
    {
        $this->load->database();
    }

    /**
     * remove user and all of their associated scores
     * @param $userId id of user
     */
    public function deleteUser($userId){
        try {
            $tables = array('users', 'ratings', 'leaderboard');
            $this->db->where('user_id', $userId);
            $this->db->delete($tables);

        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * retrieve all users data
     */
    public function getUsers(){
        try {
            $query = $this->db->query('
                SELECT users.user_id as "userId", users.username as "username", users.access_level as "accessLevel"
                FROM users
                WHERE users.access_level NOT LIKE \'admin\'
            ');

            return $query->result_array();
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * retrieve data neccessary to create statistic counting all favorited openers
     * @return array opener id, pieces and their favorited count
     */
    public function getFavoritedCount(){
        try {
            $query = $this->db->query('
                SELECT openers.pco_id as opener_id, openers.pieces as pieces, 
                    (
                        SELECT COUNT(favorited)
                        FROM ratings
                        where ratings.favorited = 1 AND ratings.pco_id = opener_id
                    ) as favoritedCount
                FROM openers
            ');

            return $query->result_array();
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * retrieve data neccessary to create statistic creating calendar of live play/scoring
     * @return array data of all live plays, their date submitted and score
     */
    public function getPlayHistory(){
        try {
            $query = $this->db->query('
                SELECT score, date_submitted as dateSubmitted
                FROM leaderboard
                ORDER BY date_submitted DESC
            ');

            return $query->result_array();
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }
}